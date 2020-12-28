function reqListener() {
    console.log(this.responseText);
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

const ebody = {
}

const headers = {
    Authorization: '172d2e76f397c3600be76b01a16d2952'
}

const pre = 'https://us.elabjournal.com/api/v1/' //### BE CAREFUL TONY, THIS IS THE ACTUAL SITE ###
const body = {
    method: 'get',
    url: pre + 'barcode/005000011013368', // this is primer
    // url: 'https://dog.ceo/api/breeds/list/all',
    // CType: 'application/json',
    data: ebody,
    headers: headers
}
let msg = JSON.stringify(body)
console.log(msg)
oReq.send(msg);