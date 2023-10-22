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