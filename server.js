const https = require('https');
const fs = require('fs');
const express = require('express');
const axios = require('axios').default

const kpath = 'cert/10.0.0.224';
const hostname = '10.0.0.224';
// const hostname = 'localhost';
// const hostname = '192.168.43.187';
const port = 3388;
const credentials = {
  key: fs.readFileSync(kpath + '-key.pem'),
  cert: fs.readFileSync(kpath + '.pem')
};

const app = express();
app.use(express.json());

app.use("/src", express.static('src'));
app.use("/test", express.static('test'));
app.use("/lib", express.static('lib'));

const favicon = require('serve-favicon');
app.use(favicon(__dirname + '\\favicon.ico'));

app.get('/', (req, res) => {
  console.log(`get:${req.originalUrl}`)

  let path, ext;
  if (req.url == '/') {
    path = './index.html';
    ext = 'html';
  } else {
    path = req.url;
  }

  return ReplyPage(path, ext, res);
})

app.get('/sleep', (req, res) => {
  console.log("sleep")

  return ReplyPage('./pages/sleep.html', 'html', res);
})

let auth = fs.readFileSync('./auth').toString();
const elabURL = 'https://us.elabjournal.com/api/v1/';

app.post('/-cors', (req, res) => {
  console.log(`post:${req.originalUrl}`)
  // console.log(JSON.stringify(req.body))

  let params = req.body;
  console.log(JSON.stringify(params))
  params['headers'] = { Authorization: auth };
  let endpoint = params.url;
  params.url = elabURL + params.url;

  // divert sample type since elab has no barcodes
  if (endpoint.startsWith('barcode/')) {
    let start = endpoint.lastIndexOf('/');
    let code = endpoint.substring(start + 1);

    // 004 is arbitrarily choosen for sample types
    if (code.startsWith("004")) {
      let sampleTypeID = code.substring(code.length - 6);
      res.json({response: {
        type: 'SAMPLETYPE',
        id: sampleTypeID
      }})
      res.end();
      return;
    }
  }

  axios(params).then((elabReply) => {
    res.json({ response: elabReply.data });
    res.end();
  }).catch((err) => {
    console.error(err.message)
    res.write(err.message);
    res.end();
  });

})

function ReplyPage(path, ext, res) {
  return fs.readFile(path, (err, file) => {
    let status = 200;
    let msg;
    if (err) {
      status = 404
      msg = err.toString();
    } else {
      msg = file
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/' + ext);
    res.write(msg);
    res.end();
  });
}


const server = https.createServer(credentials, app)

server.listen(port, hostname, () => {
  console.log(`started on ${hostname}:${port}`)
})

// let ax = {
//   // url: data.url,
//   // method: data.method
//   url: 'https://dog.ceo/api/breeds/list/all',
//   method: 'get'
// }
// console.log(JSON.stringify(ax))

// axios(ax).then((res) => {
//   console.log(res.data)
// }).catch((err) => {
//   console.error('no')
// });



// // https.createServer(options, function (req, res) {
// //   res.writeHead(200);
// //   res.end("hello world\n");
// // }).listen(8000);

// const server = https.createServer(options, (req, res) => {
//   let ext, path = '.';

//   if (req.url == '/') {
//     ext = 'html'
//     path += '/index.html'
//   } else if (req.url == '/test') {
//     ext = 'html'
//     path += '/test.html'
//   } else if (req.url == '/-scanner') {
//     bounceReq(req, res)
//     return
//   } else {
//     ext = ''
//     path += req.url
//     //console.log('hey Tony, something tried to load a file thats not html or js, look in localServer.js');
//   }

//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/' + ext);

//   console.log(path);
//   fs.readFile(path, function (err, html) {
//     if (err) {
//       throw err;
//     }
//     res.write(html);
//     res.end();
//   });
// }).listen(port, hostname, () => {
//   console.log(`started on ${hostname}:${port}`)
// })

// function bounceReq(req, res)
// {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text')
//   res.write("haha")
//   res.end();
// }