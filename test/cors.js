function reqListener() {
    console.log(this.responseText);

    document.getElementById("label").innerHTML = this.responseText
}

var address = "/-cors"

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("POST", address);
oReq.setRequestHeader("Content-Type", "application/json");

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

const st1 = '004000000037684';
const st2 = '004000000037687';
const bar = '005000011221033';
            
const body = {
    method: 'get',
    url: `barcode/${st2}`,
    // url: pre + `storageLayers/${sb1}`,
    // url: pre + `samples/${a}/moveToLayer/${sb1}`,
    // url: 'https://dog.ceo/api/breeds/list/all',
    // CType: 'application/json',
    data: ebody
}
let msg = JSON.stringify(body)
console.log(msg)
oReq.send(msg);