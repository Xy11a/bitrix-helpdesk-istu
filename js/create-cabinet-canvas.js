







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
            ip: formCabData[0 + (i * 3)].value,
            mac: formCabData[1 + (i * 3)].value,
            inv: formCabData[2 + (i * 3)].value,
            x: pcArray[i].attrs.x,
            y: pcArray[i].attrs.y,
            scaleX: pcArray[i].attrs.scaleX,
            scaleY: pcArray[i].attrs.scaleY,
            rotation: pcArray[i].attrs.rotation,
            cabinet: findCabinetNumber
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

    alert("Устройства были успешно добавлены")
    location.reload();
})



