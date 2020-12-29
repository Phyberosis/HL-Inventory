function reqListener() {
    console.log(this.responseText);

    document.getElementById("label").innerHTML = this.responseText
}

var address = "/-scanner"

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("POST", address);
oReq.setRequestHeader("Content-Type", "application/json");

// const ebody = {
//     username: 'phyberos@student.ubc.ca',
//     password: 'sd43South27'
// }

const headers = {
    Authorization: '172d2e76f397c3600be76b01a16d2952'
}


//885050 1
//885059 2
//885065 3

//11202014 a1
//11202017 a2

const sb1 = "885050"
const sb2 = "885059"
const sb3 = "885065"

const a = "11202014"
const b = "11202017"
const ebody = {
    position: 12
}

const pre = 'https://us.elabjournal.com/api/v1/' //### BE CAREFUL TONY, THIS IS THE ACTUAL SITE ###
const body = {
    method: 'get',
    url: pre + `storageLayers/${sb1}/freeLocation`,
    // url: pre + `samples/${a}/moveToLayer/${sb1}`,
    // url: 'https://dog.ceo/api/breeds/list/all',
    // CType: 'application/json',
    data: ebody,
    headers: headers
}
let msg = JSON.stringify(body)
console.log(msg)
oReq.send(msg);