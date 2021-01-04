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
// const ebody = {
//     sampleTypeID: parseInt('037687'),
//     name: 'New test 2 parent 03',
//     storageLayerID: parseInt(sb2),
//     position: 4
// }
// // const ebody = {};
// const ebody = {
//     truncated: false,
//     archived: false,
//     sampleDataType: "TEXT",
//     value: 'asdf\n\nfdsa',
//     key: "Parents",
//     sampleTypeMetaID: 243934,
// }

// const ebody = {
//     truncated: false,
//     archived: false,
//     sampleDataType: "SAMPLELINK",
//     value: '',
//     sampleIDs: [
//         11202014
//     ],
//     key: "Parent 1",
//     sampleTypeMetaID: 243925,
// }

// const ebody = {
//     samples: [
//         {
//             sampleID: 11202014,
//             name: "a1",
//             barcode: "005000011202014"
//         }
//     ],
//     key: 'test'
// }

const st1 = '004000000037684';
const st2 = '004000000037687';
const bar = '005000011221033';

const t = '11221123' // sample
const t2 = '92702374' // samplemetaid
const mt = '11221117'

const body = {
    method: 'put',
    url: `samples/${11221129}/meta`,
    // url: `samples/${t}/meta/${t2}`,
    // url: pre + `storageLayers/${sb1}`,
    // url: pre + `samples/${a}/moveToLayer/${sb1}`,
    // url: 'https://dog.ceo/api/breeds/list/all',
    // CType: 'application/json',
    data: ebody
}
let msg = JSON.stringify(body)
console.log(msg)
oReq.send(msg);