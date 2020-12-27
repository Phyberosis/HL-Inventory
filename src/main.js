const wqrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const barCanvas = document.getElementById("bar-canvas");
const canvas = canvasElement.getContext("2d");

const lblRes = document.getElementById('lbl_result')

let scanning = false;

window.addEventListener('load', (event) => {
    let videoStream;

    // qr code and video
    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
            videoStream = stream;

            scanning = true;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.srcObject = stream;
            video.play();
            console.log("qr started")

            tick();
            scan();
        });

    navigator.mediaDevices.enumerateDevices().then(function (devices) {
        return Promise.all(devices)
    }).then((devices) =>{
        let id;
        for(let d of devices)
        {
            if(d.kind.includes('video'))
            {
                if(d.label.toLowerCase().includes('user') && !id)
                {
                    id = d.deviceId;
                }else if(d.label.toLowerCase().includes('environment'))
                {
                    id = d.deviceId;
                    break;
                }
            }
        }
        return id;
    }).then((id) => {

        //barcode
        Quagga.init({
            inputStream : {
              name : "Live",
              type : "LiveStream",
              target: canvasElement
            },
            decoder : {
              readers : ["code_128_reader"]
            }
        }, function (err) {
            if (err) {
                console.log(err);
                return
            }

            Quagga.start();
            console.log("bar started");
        });
    })
});

wqrcode.callback = (res) => {
    if (res) {
        console.log(res)

        scanning = false;

        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        lblRes.innerHTML = res;
    }
};

Quagga.onDetected((res) => {
    if(res.codeResult.code)
    {
        let code = res.codeResult.code
        console.log(code);

        scanning = false;
    
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        lblRes.innerHTML = code
    }
})

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
        wqrcode.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
}