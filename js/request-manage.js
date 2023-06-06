const requestTable = document.getElementById("request-table")


let programRequest = [];
let connectionRequest = [];
let maintenanceRequest = [];
let accountRequest = [];

loadRequest().then(r => console.log("Loaded\n"));

async function loadRequest() {
    programRequest = await loadProgramRequests();
    connectionRequest = await loadConnectionRequests();
    maintenanceRequest = await loadMaintenanceRequests();
    accountRequest = await loadAccountRequest();
}


async function loadProgramRequests() {
    let data = await $.getJSON("../api/getProgramRequests.php")

    loadTable(data);

    return data;
}

async function loadConnectionRequests() {
    return [];
}

async function loadMaintenanceRequests() {
    return [];
}

async function loadAccountRequest() {
    return [];
}

function loadTable(data) {
    data.forEach(el => {
        let tr = document.createElement("tr");
        let badge = document.createElement("span");
        let a = document.createElement('a');

        a.classList.add("btn", "btn-success", "w-100", "h-100", "h-100", "bg-opacity-100")
        a.href = "../requests/full-request?id="+el.id+"&type="+el.request_group;
        a.innerHTML="->";


        switch (el.status) {
            case "Открыта":
                tr.classList.add("bg-primary", "bg-opacity-10")
                badge.classList.add("badge", "text-bg-primary", "w-100", "h-100", "bg-opacity-100")
                badge.innerHTML = "Открыта"
                break;
            case "Выполнена":
                tr.classList.add("bg-success", "bg-opacity-10")
                badge.classList.add("badge", "text-bg-success", "w-100", "h-100", "bg-opacity-100")
                badge.innerHTML = "Выполнена"
                break;
            case "Рассматривается":
                tr.classList.add("bg-warning", "bg-opacity-10")
                badge.classList.add("badge", "text-bg-warning", "w-100", "h-100", "bg-opacity-100")
                badge.innerHTML = "Рассматривается"
                break;
            case "Просрочена":
                tr.classList.add("bg-danger", "bg-opacity-10")
                badge.classList.add("badge", "text-bg-danger", "w-100", "h-100", "bg-opacity-100")
                badge.innerHTML = "Просрочена"
                break;
            case "Отменена":
                tr.classList.add("bg-dark", "bg-opacity-10")
                badge.classList.add("badge", "text-bg-dark", "w-100", "h-100", "bg-opacity-100")
                badge.innerHTML = "Отменена"
                break;
        }

        let inner = "<td>" + el.id + "</td>"
        inner += "<td>" + el.request_group + "</td>"
        inner += " <td>" + el.name + "</td>"
        inner += "<td>" + el.owner + "</td>"
        inner += "<td>" + el.create_date + "</td>"
        inner += "<td>" + el.end_date + "</td>"
        inner += "<td>" + el.cabinet + "</td>"
        inner += "<td>" + badge.outerHTML + "</td>"
        inner += "<td>"+a.outerHTML+"</td>"
        tr.innerHTML = inner;
        requestTable.appendChild(tr);
    })
}