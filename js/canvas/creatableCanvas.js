const selectCabinetSVGBTN = document.getElementById('select-cabinet-svg-btn')
const deviceTableInput = document.getElementById('pc-data-input')
const addDevicesSuccess = document.getElementById('add-devices-success')
const canvasAndFormBlock = document.getElementById("form-and-canvas-block")
const canvasParent = document.getElementById("konva-parent")

let screenScale = 0;

let findCabinetNumber = null;


let deviceList = [];

//Todo сделать загрузку из БД
let deviceTypes = [
    {
        type: "Computer",
        buttonIconLink: "../files/pc.svg",
        iconLink: "../files/pc-outline.svg",
        data: {ip: null, mac: null, inv: null},
        inputDataProps: {
            ip:  {type: "text", name: "computer-ip-", placeholder: "0.0.0.0"},
            mac: {type: "text", name: "computer-mac-", placeholder: "MM:MM:MM:SS:SS:SS"},
            inv: {type: "text", name: "computer-inv-", placeholder: "Инвертарный номер"}
        }
    },
    {
        type: "Printer",
        buttonIconLink: "../files/printer.svg",
        iconLink: "../files/printer.svg",
        data: {ip: null, mac: null, inv: null},
        inputDataProps: {
            ip:  {type: "text", name: "printer-ip-", placeholder: "0.0.0.0"},
            mac: {type: "text", name: "printer-mac-", placeholder: "MM:MM:MM:SS:SS:SS"},
            inv: {type: "text", name: "printer-inv-", placeholder: "Инвертарный номер"}
        }
    },
    {
        type: "Projector",
        buttonIconLink: "../files/projector.svg",
        iconLink: "../files/projector.svg",
        data: {inv: null},
        inputDataProps: {
            inv: {type: "text", name: "projector-inv-", placeholder: "Инвертарный номер"}
        }
    },
]

////////////////////////////////////////////////////////////////////////////////////////////

cabinetSelect2.addEventListener('change', function () {
    let findCabinet = cabinetsJSON.filter((cab) => cab.number === cabinetSelect2.value).pop();
    if (cabinetsNames.includes(cabinetSelect2.value) && findCabinet.cabinetLink !== null) {
        selectCabinetSVGBTN.disabled = false;
        errorEmptySvg.innerHTML = "";
    } else {
        errorEmptySvg.innerHTML = "У данного кабинета нету плана, пожалуйста загрузите его.";
        selectCabinetSVGBTN.disabled = true;
    }
})

selectCabinetSVGBTN.addEventListener('click', async function () {
    let findCabinet = cabinetsJSON.find(({number}) => number === cabinetSelect2.value);
    let findCabinetLink = findCabinet.cabinetLink;
    findCabinetNumber = findCabinet.number;


    if (cabinetsNames.includes(cabinetSelect2.value) && findCabinet.cabinetLink !== null) {
        selectCabinetSVGBTN.disabled = true;
        cabinetSelect2.disabled = true;
        canvasAndFormBlock.className = "d-block"


        createDeviceToolbar(deviceTypes);
        createCanvas(findCabinetLink);


        let json = await getPCFromCabinetJSON(findCabinetNumber);
        for (let i = 0; i < json.length; i++) {
            createNewDevice(null,json[i])
        }
        fitStageIntoParentContainer()


        addDevicesSuccess.classList.remove("alert", "alert-success")
        addDevicesSuccess.innerHTML = "";
    }
})

function createDeviceToolbar(deviceTypes) {
    let deviceToolbar = document.getElementById("device-toolbar");
    let classString = "my-1 p-1 border border-dark btn btn-primary";
    let styleString = "width: 100px; height: 100px;";
    deviceTypes.forEach((deviceType) => {
            let button = document.createElement("div");
            let buttonName = document.createElement("div");
            let svg = document.createElement("img");
            button.style = styleString;
            button.className = classString;
            buttonName.className = "text-center";
            svg.width = 50;
            svg.height = 50;
            svg.src = deviceType.buttonIconLink
            buttonName.innerHTML = deviceType.type

            button.appendChild(buttonName);
            button.appendChild(svg);

            button.addEventListener("click", () => {
                createNewDevice(deviceType, null)
            })

            deviceToolbar.appendChild(button);
        })

    let button = document.createElement("div");
    let buttonName = document.createElement("div");
    button.className = classString;
    button.style = styleString;
    buttonName.className = "text-center";
    buttonName.innerHTML = "Добавить устройство"

    button.appendChild(buttonName);

    button.addEventListener("click", () => {
        alert("Work in progress")
    })

    deviceToolbar.appendChild(button);
}

//////////////////////////////Conva load and add////////////////////////////////////////////
function createNewDevice(deviceType, device) {

    let newDevice;
    if(device === null) {
        newDevice = new Device(deviceType.type, findCabinetNumber, deviceType.data, deviceType.inputDataProps)
    } else {
        deviceType = getDeviceType(device.type);
        newDevice = new Device(device.type,findCabinetNumber,JSON.parse(device.data), deviceType.inputDataProps)
        newDevice.setPosition(parseFloat(device.x), parseFloat(device.y))
        newDevice.setScaleAndRotation(parseFloat(device.sX),parseFloat(device.sY), parseFloat(device.rotation))
        newDevice.id=device.id
    }

        newDevice.name = deviceType.type + " - " + getTypeCount(deviceType.type);

        Konva.Image.fromURL(deviceType.iconLink, (imageNode) => {
            pcLayer.add(imageNode);

            imageNode.setAttrs({
                width: 150,
                height: 100,
                draggable: true,
                name: 'pc',
                x: newDevice.x,
                y: newDevice.y,
                scaleX: newDevice.sX,
                scaleY: newDevice.sY,
                rotation: newDevice.rotation
            });

            imageNode.on('mousemove', function () {
                let mousePos = stage.getPointerPosition();
                tooltip.position({
                    x: mousePos.x + (5*screenScale),
                    y: mousePos.y + (5*screenScale),
                });
                tooltip.text(newDevice.name);
                tooltip.show();
            });

            imageNode.on('mouseout', function () {
                tooltip.hide();
            });

            imageNode.on('dragstart', function () {
                tooltip.hide();
            });

            imageNode.on('dragend', function () {
                newDevice.setPosition(imageNode.attrs.x, imageNode.attrs.y)
            });

            imageNode.on('transformend', function () {
                newDevice.setScaleAndRotation(imageNode.attrs.scaleX, imageNode.attrs.scaleY, imageNode.attrs.rotation)
            })

            deviceList.push(newDevice);

        });

        let tr_table = document.createElement('tr')
        tr_table.classList.add('border', 'border-dark')
        tr_table.innerHTML = newDevice.createFormInputs();
        deviceTableInput.appendChild(tr_table)

}


function getTypeCount(type) {
    let count = 0;
    deviceList.forEach((device) => {
        if (device.type === type) count++
    })
    return count+1;
}

function getDeviceType(type) {
    return  deviceTypes.find((devList)=> devList.type === type)
}




//////////////////////////////Async func///////////////////////////////////////////////////

async function getPCFromCabinetJSON(cabinet) {
    data = await $.getJSON("../api/getCabinetDevices.php?cabinet=" + cabinet);
    return data;
}

function deleteDevice(id) {
    //TODO Сделать api удаления и модальное окно
    let bool = confirm("Вы точно хотите удалить устройство?")

    if(bool) {
        $.ajax({
            type: "POST",
            url: "../api/removeDeviceFromPlan.php?delDeviceId="+id,
        });
        location.reload();
    }

}


$('#addDeviceForm').on('submit', function (event) {
    //TODO: Изменить базу, добавть ПК в базу, Сдеать PHP
    event.preventDefault();
    let form = document.querySelector("#addDeviceForm")
    let formData = new FormData(form);


    let jsonArray = []

    deviceList.forEach((device) => {
        let deviceJson =
            {
                id: device.id,
                type: device.type,
                x: device.x,
                y: device.y,
                sX: device.sX,
                sY: device.sY,
                rotation: device.rotation,
                data: device.updateData(formData),
                cabinet: findCabinetNumber
            }

        jsonArray.push(deviceJson)
    })

    jsonArray = JSON.stringify(jsonArray);

    console.log(jsonArray)

    $.ajax({
        type: "POST",
        url: "../api/addDeviceToPlan.php",
        data: jsonArray,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert(data);
        },
    });

    // alert("Устройства были успешно добавлены")
    // location.reload();
})





//////////////////////////////Conva Setup///////////////////////////////////////////////////
let width = 800, height = 300;
const konvaContainer = document.querySelector('konvas-container')

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

function createCanvas(SOURCE) {
    Konva.Image.fromURL(SOURCE, (imageNode) => {
        backgroundLayer.add(imageNode);
        imageNode.setAttrs({
            width: 800,
            height: 300,
        });
    });
}


function fitStageIntoParentContainer() {

    var containerWidth = canvasParent.offsetWidth;

    screenScale = containerWidth / width;

    stage.width(width * screenScale);
    stage.height(height * screenScale);
    stage.scale({ x: screenScale, y: screenScale });
}

// fitStageIntoParentContainer();

window.addEventListener('resize', fitStageIntoParentContainer);


////////////////////////////////////////////////////////////////////////////////////////////
