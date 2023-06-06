const bt1 = document.getElementById("btnradio1")
const bt2 = document.getElementById("btnradio2")
const bt3 = document.getElementById("btnradio3")

const divForm1 = document.getElementById("form-one")
const divForm2 = document.getElementById("form-two")
const divForm3 = document.getElementById("form-three")

const form1 = document.getElementById("form1")
const form2 = document.getElementById("form2")
const form3 = document.getElementById("form3")

const formsArr = [form1, form2, form3]

setupNamesAndEmails();


divForm1.classList.add('disabled')
divForm2.classList.add('disabled')
divForm3.classList.add('disabled')
divForm1.classList.remove('disabled')

bt1.addEventListener('click', () => {
    divForm1.classList.remove('disabled')
    divForm2.classList.add('disabled')
    divForm3.classList.add('disabled')
})

bt2.addEventListener('click', () => {
    divForm1.classList.add('disabled')
    divForm2.classList.remove('disabled')
    divForm3.classList.add('disabled')
})

bt3.addEventListener('click', () => {
    divForm1.classList.add('disabled')
    divForm2.classList.add('disabled')
    divForm3.classList.remove('disabled')
})


formsArr.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(form);
        let requestObj = {};

        let ipObj = {}
        let macObj = {}
        let invObj = {}
        let count = 0;
        let arrPC = [];

        formData.forEach((value, key) => {
            if (key.match(/^(ip-\d+)|(mac-\d+)|(inventoryId-\d+)$/)) {
                if(key.match(/^(ip-\d+)$/)) ipObj[key] = value
                if(key.match(/^(mac-\d+)$/)) macObj[key] = value
                if(key.match(/^(inventoryId-\d+)$/)) invObj[key] = value
                count++;
            } else {
                requestObj[key] = value;
            }
        })

        for (let i = 0; i < count/3; i++) {
            let ip = "ip-"+i;
            let mac = "mac-"+i;
            let inv = "inventoryId-"+i;
            arrPC.push({ip:ipObj[ip],mac:macObj[mac],inv:invObj[inv]})
        }

        const json1 = JSON.stringify(requestObj);
        const json2 = JSON.stringify(arrPC);

        console.log(json1)
        console.log("########")
        console.log(json2)


        $.ajax({
            type: "POST",
            url: "../api/addProgramRequest.php?cabinet=" + form['classroomId'].value,
            data: json1,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $.ajax({
                    type: "POST",
                    url: "../api/addPCtoRequest.php?request=" + data,
                    data: json2,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {
                        location.reload()
                    },
                });
            },
        });

    })
})


async function setupNamesAndEmails() {
    let user = await getUserInfo();
    let userCredits = user[0].NAME + " " + user[0].LAST_NAME;
    let userEmail = user[0].EMAIL;

    form1.elements["fio"].value = userCredits
    form1.elements["stuffEmail"].value = userEmail

    form2.elements["fio"].value = userCredits
    form2.elements["stuffEmail"].value = userEmail

    form3.elements["fio"].value = userCredits
    form3.elements["stuffEmail"].value = userEmail
}