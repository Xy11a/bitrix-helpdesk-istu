
async function getUserInfo() {
    let data = await $.getJSON("../api/getUserInfo.php")

    return data;
}