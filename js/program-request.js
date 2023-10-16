const requestTypeButton = document.getElementById("request-type-button")
const requestTypeSelect = document.getElementById("request-type-select")

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


requestTypeButton.addEventListener('click', () => {

    switch (requestTypeSelect.value) {
        case "studyProgram":
            divForm1.classList.remove('disabled')
            divForm2.classList.add('disabled')
            divForm3.classList.add('disabled')
            break;
        case "adminProgram":
            divForm1.classList.add('disabled')
            divForm2.classList.remove('disabled')
            divForm3.classList.add('disabled')
            break;
        case "installAntivirus":
            divForm1.classList.add('disabled')
            divForm2.classList.add('disabled')
            divForm3.classList.remove('disabled')
            break;
    }
    requestTypeButton.disabled = true
    requestTypeSelect.disabled = true
})



formsArr.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(form);
        let requestObj = {};
        let pcObj = {};
        formData.forEach((value, key) => {

            if(key.match(/^(ip-\d+)|(mac-\d+)|(inventoryId-\d+)$/))
            {
                pcObj[key] =value
            } else requestObj[key] = value;
        })
        let json1 = JSON.stringify(requestObj);
        let json2 = JSON.stringify(pcObj);

        console.log(json1)
        console.log("########")
        console.log(json2)

    })
})

async function setupNamesAndEmails() {
    let user = await getUserInfo();
    let userCredits = user[0].NAME +" "+ user[0].LAST_NAME;
    let userEmail = user[0].EMAIL;

    form1.elements["fio"].value=userCredits
    form1.elements["stuffEmail"].value=userEmail

    form2.elements["fio"].value=userCredits
    form2.elements["stuffEmail"].value=userEmail

   // form3.elements["fio"].value=userCredits
  //  form3.elements["stuffEmail"].value=userEmail
}