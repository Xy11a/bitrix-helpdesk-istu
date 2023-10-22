const addSVGForm = document.getElementById('form-add-svg')
const errorSvg = document.getElementById('error-svg')
const errorEmptySvg = document.getElementById('error-empty-svg')
const addSVGBTN = document.getElementById('add-svg-btn')
const fileInput = document.getElementById('inputFile');
const createMessageSVG = document.getElementById('create-svg-success')

addSVGBTN.disabled = true



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