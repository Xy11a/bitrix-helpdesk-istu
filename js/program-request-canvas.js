const cabinetSelect1 = document.getElementById('cabinetSel1')
const cabinetSelect2 = document.getElementById('cabinetSel2')
const cabinetSelect3 = document.getElementById('cabinetSel3')

const cabinetConfirm1 = document.getElementById('cabinetConf1')
const cabinetConfirm2 = document.getElementById('cabinetConf2')
const cabinetConfirm3 = document.getElementById('cabinetConf3')

const pcInputTab1 = document.getElementById('table-pc-input1')
const pcInputTab2 = document.getElementById('table-pc-input2')
const pcInputTab3 = document.getElementById('table-pc-input3')

const divTable1 = document.getElementById('div-table1')
const divTable2 = document.getElementById('div-table2')
const divTable3 = document.getElementById('div-table3')


let cabinetsJSON = []
let pcCount = 0;
let pcArray = []
let pcSelection = []
getCabinets();


////////////ASYNC/////////////////////////////
async function getCabinets() {
    let data = await $.getJSON("../api/getCabinetList.php")

    data.forEach(el => {
        let name = el.number
        cabinetSelect1.innerHTML += "<option value=\"" + name + "\">" + name + "</option>"
        cabinetSelect2.innerHTML += "<option value=\"" + name + "\">" + name + "</option>"
        cabinetSelect3.innerHTML += "<option value=\"" + name + "\">" + name + "</option>"
        cabinetsJSON.push(el)
    })

    return data;
}

async function getPCFromCabinetJSON(cabinet) {
    data = await $.getJSON("../api/getCabinetDevices.php?cabinet=" + cabinet);
    return data;
}

////////////ASYNC/////////////////////////////

cabinetConfirm1.addEventListener("click", async function () {
    cabinetConfirm1.disabled = true
    divTable1.classList.remove("disabled")

    let pcListJSON = await getPCFromCabinetJSON(cabinetSelect1.value)
    let cabinet = cabinetsJSON.find(({number}) => number === cabinetSelect1.value)

    cabinetSelect1.disabled =true;

    stage = new Konva.Stage({
        container: "konvas-container1",
        width: width,
        height: height,
    });
    toolTipLayer.add(tooltip)
    stage.add(backgroundLayer);
    stage.add(pcLayer);
    stage.add(toolTipLayer)
    createBackground(cabinet, backgroundLayer)
    loadPC(pcListJSON, pcInputTab1, pcLayer);
})
cabinetConfirm2.addEventListener("click", async function() {
    cabinetConfirm2.disabled = true
    divTable2.classList.remove("disabled")

    let pcListJSON = await getPCFromCabinetJSON(cabinetSelect2.value)
    let cabinet = cabinetsJSON.find(({number}) => number === cabinetSelect2.value)

    cabinetSelect2.disabled =true;

    stage = new Konva.Stage({
        container: "konvas-container2",
        width: width,
        height: height,
    });
    toolTipLayer.add(tooltip)
    stage.add(backgroundLayer);
    stage.add(pcLayer);
    stage.add(toolTipLayer)
    createBackground(cabinet, backgroundLayer)
    loadPC(pcListJSON, pcInputTab2, pcLayer);
})
cabinetConfirm3.addEventListener("click", async function() {
    cabinetConfirm3.disabled = true
    divTable3.classList.remove("disabled")

    let pcListJSON = await getPCFromCabinetJSON(cabinetSelect3.value)
    let cabinet = cabinetsJSON.find(({number}) => number === cabinetSelect3.value)

    cabinetSelect3.disabled =true;

    stage = new Konva.Stage({
        container: "konvas-container3",
        width: width,
        height: height,
    });
    toolTipLayer.add(tooltip)
    stage.add(backgroundLayer);
    stage.add(pcLayer);
    stage.add(toolTipLayer)
    createBackground(cabinet, backgroundLayer)
    loadPC(pcListJSON, pcInputTab3, pcLayer);
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let width = 800, height = 300;
var stage = "";



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

var backgroundLayer = new Konva.Layer();
var pcLayer = new Konva.Layer();
var toolTipLayer = new Konva.Layer();




function createBackground(SOURCE, backgroundLayer) {
    Konva.Image.fromURL(SOURCE.cabinetLink, (imageNode) => {
        backgroundLayer.add(imageNode);
        imageNode.setAttrs({
            width: 800,
            height: 300,
        });
    });
}

function loadPC(pcJSON, tablePC, pcLayer) {
    for (let i = 0; i < pcJSON.length; i++) {
        pcCount++;
        let pcName = "ПК-" + pcCount;
        Konva.Image.fromURL('../files/pc-outline.svg', (imageNode) => {
            pcLayer.add(imageNode);
            imageNode.setAttrs({
                width: 150,
                height: 100,
                draggable: false,
                name: 'pc',
                x: parseFloat(pcJSON[i].x),
                y: parseFloat(pcJSON[i].y),
                scaleX: parseFloat(pcJSON[i].sX),
                scaleY: parseFloat(pcJSON[i].sY),
                rotation: parseFloat(pcJSON[i].rotation),
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

            imageNode.on('click', function () {
                if (!pcSelection.includes(i)) {
                    imageNode.stroke('green');
                    imageNode.strokeWidth(10)
                    pcSelection.push(i)

                } else {
                    imageNode.stroke(null);
                    imageNode.strokeWidth(null)
                    pcSelection = pcSelection.filter(e => e !== i)
                }
                pcSelection = pcSelection.sort((a, b) => a - b)

                tablePC.innerHTML = "";

                pcSelection.forEach(e => {
                    j = e;
                    pcArray = pcArray.sort((a, b) => a[0] - b[0])
                    let pc = "<td>ПК-" + (pcArray[j][0] + 1) + "</td>"
                    let ip = " <td><label>IP:</label><input class=\"w-100\" type=\"text\" name=\"ip-" + j + "\" value='" + pcArray[j][2] + "' readonly></td>"
                    let mac = "<td><label>MAC:</label><input class=\"w-100\" type=\"text\" name=\"mac-" + j + "\" value='" + pcArray[j][3] + "'  readonly></td>"
                    let inv = "<td><label>Инвентарный номер:</label><input class=\"w-100\" type=\"text\" name=\"inventoryId-" + j + "\" value='" + pcArray[j][4] + "' readonly></td>"
                    let tr = document.createElement('tr')
                    tr.innerHTML += pc + ip + mac + inv;
                    tablePC.appendChild(tr)
                })
            })
            pcArray.push([(i), imageNode, pcJSON[i].ip, pcJSON[i].mac, pcJSON[i].inv])
        });


    }

}




