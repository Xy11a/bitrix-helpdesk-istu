const buildingSelect = document.getElementById('building-select')
const createMessageCabinet = document.getElementById('create-msg')
const cabinetInput = document.getElementById('cabinet-number')
const createFormCabinet = document.getElementById('form-create-cabinet')
const errorCabinet = document.getElementById('error-cabinet')
const addCabinetBTN = document.getElementById('add-cabinet-btn')
const cabinetSelect1 = document.getElementById('cabinet-select-1')
const cabinetSelect2 = document.getElementById('cabinet-select-2')

let cabinetsJSON = [];
let cabinetsNames = [];
addCabinetBTN.disabled = true

/////Выполняемые функции/////
updateCabinets()
////////////////////////////
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