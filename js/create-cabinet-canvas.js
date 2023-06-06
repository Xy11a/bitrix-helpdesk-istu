//TODO: Сделать канву SVG AXAXAXAXAXAX

cabinetSelect2.addEventListener('change', function () {
    let findCabinet = cabinetsJSON.find(({corpus, number}) => corpus + number === cabinetSelect2.value);
    if (cabinetsNames.includes(cabinetSelect2.value) && findCabinet.cabinetLink !== null) {
        selectCabinetSVGBTN.disabled = false
        errorEmptySvg.innerHTML = "";
    } else {
        errorEmptySvg.innerHTML = "У данного кабинета нету плана, пожалуйста загрузите его.";
        selectCabinetSVGBTN.disabled = true
    }

})


async function getPCFromCabinetJSON(cabinet) {
    data = await $.getJSON("../api/getCabinetDevices.php?cabinet=" + cabinet);
    return data;
}


selectCabinetSVGBTN.addEventListener('click', async function () {
    let findCabinet = cabinetsJSON.find(({number}) => number === cabinetSelect2.value);
    let json = await getPCFromCabinetJSON(findCabinet.number);
    if (cabinetsNames.includes(cabinetSelect2.value) && findCabinet.cabinetLink !== null) {
        creteCanvas(findCabinet.cabinetLink)
        selectCabinetSVGBTN.disabled = true;
        addPCBTN.classList.remove('disabled')
        addPrinterBTN.classList.remove('disabled')
        createPCFromJSON(json);
        addDevicesSuccess.classList.remove("alert", "alert-success")
        addDevicesSuccess.innerHTML = "";
    }
})

//$$$$$$$$$$$
let width = 800, height = 300;
const stage = new Konva.Stage({
    container: 'konvas-container',
    width: width,
    height: height,
});

var tooltip = new Konva.Text({
    text: '',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    textFill: 'blue',
    fill: 'black',
    alpha: 0.75,
    visible: false,
    stroke: 'black'
});


const backgroundLayer = new Konva.Layer();
const pcLayer = new Konva.Layer();
const pcLayer2 = new Konva.Layer();
const toolTipLayer = new Konva.Layer();

toolTipLayer.add(tooltip)
stage.add(backgroundLayer);
stage.add(pcLayer);
stage.add(pcLayer2);
stage.add(toolTipLayer)

var tr = new Konva.Transformer();
pcLayer.add(tr);

var tr2 = new Konva.Transformer();
pcLayer2.add(tr2);


// add a new feature, lets add ability to draw selection rectangle
var selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
});
pcLayer.add(selectionRectangle);

var x1, y1, x2, y2;
stage.on('mousedown touchstart', (e) => {
    // do nothing if we mousedown on any shape
    if (e.target !== stage) {
        return;
    }
    e.evt.preventDefault();
    x1 = stage.getPointerPosition().x;
    y1 = stage.getPointerPosition().y;
    x2 = stage.getPointerPosition().x;
    y2 = stage.getPointerPosition().y;

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
});

stage.on('mousemove touchmove', (e) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
        return;
    }
    e.evt.preventDefault();
    x2 = stage.getPointerPosition().x;
    y2 = stage.getPointerPosition().y;

    selectionRectangle.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
    });
});

stage.on('mouseup touchend', (e) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
        return;
    }
    e.evt.preventDefault();
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
        selectionRectangle.visible(false);
    });

    var shapes = stage.find('.Image');
    var box = selectionRectangle.getClientRect();
    var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    tr.nodes(selected);
});

// clicks should select/deselect shapes
stage.on('click tap', function (e) {
    // if we are selecting with rect, do nothing
    if (selectionRectangle.visible()) {
        return;
    }

    // if click on empty area - remove all selections
    if (e.target === stage) {
        tr.nodes([]);
        return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('pc')) {
        return;
    }


    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {

        tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = tr.nodes().concat([e.target]);
        tr.nodes(nodes);
    }
});


//$$$$$$$$$$$


function creteCanvas(SOURCE) {
    Konva.Image.fromURL(SOURCE, (imageNode) => {
        backgroundLayer.add(imageNode);
        imageNode.setAttrs({
            width: 800,
            height: 300,
        });
    });
}


addPCBTN.addEventListener("click", cretePC);

function cretePC() {
    pcCount++;
    let pcName = "ПК-" + pcCount;
    //TODO: Доделать кнопку создания пк , и изменить её дизайн.
    Konva.Image.fromURL('../files/pc-outline.svg', (imageNode) => {
        pcLayer.add(imageNode);
        imageNode.setAttrs({
            width: 150,
            height: 100,
            draggable: true,
            name: 'pc',
        });

        imageNode.on('mousemove', function () {
            let mousePos = stage.getPointerPosition();
            tooltip.position({
                x: mousePos.x + 5,
                y: mousePos.y + 5,
            });
            tooltip.text(pcName);
            tooltip.show();
        });

        imageNode.on('mouseout', function () {
            tooltip.hide();
        });

        imageNode.on('dragstart', function () {
            tooltip.hide();
        });


        pcArray.push(imageNode)
        //tr.nodes(pcArray)
    });


    let pc = "<td>ПК - " + pcCount + "</td>"
    let ip = " <td><label>IP:</label><input class=\"w-100\" type=\"text\" name=\"ip-" + pcCount + "\" placeholder=\"0.0.0.0\" required></td>"
    let mac = "<td><label>MAC:</label><input class=\"w-100\" type=\"text\" name=\"mac-" + pcCount + "\" placeholder=\"MM:MM:MM:SS:SS:SS\" required></td>"
    let inv = "<td><label>Инвертарный номер:</label><input class=\"w-100\" type=\"text\" name=\"inventoryId-" + pcCount + "\" placeholder=\"Инвертарный номер\" required></td>"
    let tr_table = document.createElement('tr')
    tr_table.classList.add('border', 'border-dark')
    tr_table.innerHTML = pc + ip + mac + inv;
    pcTableInput.appendChild(tr_table)
}


function createPCFromJSON(json) {
    for (let i = 0; i < json.length; i++) {
        pcCount++;
        let pcName = "ПК-" + pcCount;
        Konva.Image.fromURL('../files/pc-outline.svg', (imageNode) => {
            pcLayer2.add(imageNode);
            imageNode.setAttrs({
                width: 150,
                height: 100,
                draggable: true,
                name: 'pc',
                x: parseFloat(json[i].x),
                y: parseFloat(json[i].y),
                scaleX: parseFloat(json[i].sX),
                scaleY: parseFloat(json[i].sY),
                rotation: parseFloat(json[i].rotation),
            });

            imageNode.on('mousemove', function () {
                let mousePos = stage.getPointerPosition();
                tooltip.position({
                    x: mousePos.x + 5,
                    y: mousePos.y + 5,
                });
                tooltip.text(pcName);
                tooltip.show();
            });

            imageNode.on('mouseout', function () {
                tooltip.hide();
            });

            imageNode.on('dragstart', function () {
                tooltip.hide();
            });

            pcArray.push(imageNode)
        });


        let pc = "<td>ПК - " + pcCount + "</td>"
        let ip = " <td><label>IP:</label><input class=\"w-100\" type=\"text\" name=\"ip-" + pcCount + "\" value='" + json[i].ip + "' readonly></td>"
        let mac = "<td><label>MAC:</label><input class=\"w-100\" type=\"text\" name=\"mac-" + pcCount + "\" value='" + json[i].mac + "'  readonly></td>"
        let inv = "<td><label>Инвертарный номер:</label><input class=\"w-100\" type=\"text\" name=\"inventoryId-" + pcCount + "\" value='" + json[i].inv + "' readonly></td>"
        let del = "<td><button type='button' class='btn btn-primary py-3' onclick='deletePC("+json[i].ip+","+json[i].mac+","+json[i].inv+")' >🗑</button></td>"
        let tr_table = document.createElement('tr')
        tr_table.classList.add('border', 'border-dark')


        tr_table.innerHTML = pc + ip + mac + inv+del;
        pcTableInput.appendChild(tr_table)
    }
}


$('#addDeviceForm').on('submit', function (event) {
    //TODO: Изменить базу, добавть ПК в базу, Сдеать PHP
    event.preventDefault();
    let formCabData = $('#addDeviceForm').serializeArray()

    let arrPCtoJSON = []

    for (let i = 0; i < pcCount; i++) {

        if (pcArray[i].attrs.x !== undefined && pcArray[i].attrs.y !== undefined && pcArray[i].attrs.scaleX !== undefined && pcArray[i].attrs.scaleY !== undefined && pcArray[i].attrs.rotation !== undefined) {

        } else {
            errorEmptySvg.innerHTML = "Внимение ПК-" + (i + 1) + " находиться в неподходящем месте";
            return;
        }

        let pc = {
            ip: formCabData[1 + (i * 3)].value,
            mac: formCabData[2 + (i * 3)].value,
            inv: formCabData[3 + (i * 3)].value,
            x: pcArray[i].attrs.x,
            y: pcArray[i].attrs.y,
            scaleX: pcArray[i].attrs.scaleX,
            scaleY: pcArray[i].attrs.scaleY,
            rotation: pcArray[i].attrs.rotation,
            cabinet: formCabData[0].value
        }
        arrPCtoJSON.push(pc)
    }

    console.log(arrPCtoJSON)

    let json = JSON.stringify(arrPCtoJSON)


    $.ajax({
        type: "POST",
        url: "../api/addDeviceToPlan.php",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert(data);
        },
    });

    location.reload();
})

function deletePC(ip,mac,inv) {
    $.ajax({
        type: "POST",
        url: "../api/removeDeviceFromPlan.php",
        data: JSON.stringify({ip:ip,mac:mac, inv: inv}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    });
    location.reload();
}