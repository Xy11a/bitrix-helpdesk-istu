const fileInput = document.getElementById('inputFile');
const cabinetInput = document.getElementById('cabinet-number')
const buildingSelect = document.getElementById('building-select')
const cabinetSelect1 = document.getElementById('cabinet-select-1')
const cabinetSelect2 = document.getElementById('cabinet-select-2')
const errorCabinet = document.getElementById('error-cabinet')
const errorSvg = document.getElementById('error-svg')
const errorEmptySvg = document.getElementById('error-empty-svg')
const addCabinetBTN = document.getElementById('add-cabinet-btn')
const addSVGBTN = document.getElementById('add-svg-btn')
const selectCabinetSVGBTN = document.getElementById('select-cabinet-svg-btn')
const createFormCabinet = document.getElementById('form-create-cabinet')
const addSVGForm = document.getElementById('form-add-svg')
const createMessageCabinet = document.getElementById('create-msg')
const createMessageSVG = document.getElementById('create-svg-success')
const addPCBTN = document.getElementById('add-pc-btn')
const addPrinterBTN = document.getElementById('add-printer-btn')
const pcTableInput = document.getElementById('pc-data-input')
const addDeviceToPlanBTN = document.getElementById('addDeviceToPlanBTN')
const addDevicesSuccess = document.getElementById('add-devices-success')
let cabinetsJSON = [];
let cabinetsNames = [];
let pcInCabinetJSON = [];
let pcCount = 0;
pcArray = [];


addSVGBTN.disabled = true
addCabinetBTN.disabled = true


//###########################################

updateCabinets()

function updateCabinets() {
    cabinetsJSON = []
    cabinetsNames = []
    cabinetSelect1.innerHTML = ""
    cabinetSelect2.innerHTML = ""

    $.getJSON("../api/getCabinetList.php").then(function (data) {
        data.forEach(el => {
            let name = el.number
            cabinetSelect1.innerHTML += "<option value=\"" + name + "\">" + name + "</option>"
            cabinetSelect2.innerHTML += "<option value=\"" + name + "\">" + name + "</option>"
            cabinetsJSON.push(el)
            cabinetsNames.push(name)
        })
    })
}


$(createFormCabinet).on('submit', function (event) {
    event.preventDefault();
    let data = $(createFormCabinet).serializeArray();
    $.ajax({
        type: "POST",
        url: "../api/createCabinet.php",
        data: data,
        success: function () {
            createMessageCabinet.classList.add("alert", "alert-success")
            createMessageCabinet.innerHTML = "Успех"
            updateCabinets();
        }
    });
})

function checkExistedCabinets() {

    let cabinet = buildingSelect.value + cabinetInput.value;
    if (cabinetsNames.includes(cabinet)) {
        errorCabinet.innerHTML = "Ошибка такой кабинет уже существует " + cabinet;
        addCabinetBTN.disabled = true
    } else {
        errorCabinet.innerHTML = "";
        addCabinetBTN.disabled = false;
    }
}

function checkNumberInput() {
    if (cabinetInput.value.match(/^([0-3])([0-2])([0-9])$/i)) {
        errorCabinet.innerHTML = "";
        addCabinetBTN.disabled = false;
        return true
    } else {
        errorCabinet.innerHTML = "Ошибка неверный формат кабинета";
        addCabinetBTN.disabled = true;
        return false
    }
}

cabinetInput.addEventListener('change', function () {
    if (checkNumberInput()) checkExistedCabinets()
})
buildingSelect.addEventListener('change', function () {
    if (checkNumberInput()) checkExistedCabinets()
})


//###########################################


cabinetSelect1.addEventListener('change', function () {
    let findCabinet = cabinetsJSON.find(({number}) => (number) === cabinetSelect1.value);

    if (cabinetsNames.includes(cabinetSelect1.value) && findCabinet.cabinetLink !== null) {
        errorSvg.innerHTML = "Внимание кабинет " + cabinetSelect1.value + " уже имеет планировку. Добавление плана перезапишет прошлый план.";
    } else errorSvg.innerHTML = "";
})

fileInput.addEventListener('change', function () {
    let fileName = fileInput.files[0].name;
    if (!fileName.match(/^(.+)(.svg)$/i)) {
        errorSvg.innerHTML = "Формат файла должен быть .svg"
        addSVGBTN.disabled = true
    } else {
        errorSvg.innerHTML = ""
        addSVGBTN.disabled = false
    }
})


$(addSVGForm).on('submit', function (event) {
    event.preventDefault();
    formData = new FormData();
    formCabData = $('#form-add-svg').serializeArray()

    formData.append('uploadedFile', fileInput.files[0]);
    formData.append("cabinet", formCabData[0].value)
    $.ajax({
        type: "POST",
        url: "../api/addSVG.php",
        data: formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        success: function () {
            createMessageSVG.classList.add("alert", "alert-success")
            createMessageSVG.innerHTML = "Успех"
            updateCabinets();
        }
    });
})

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




