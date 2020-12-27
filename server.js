const https = require('https');
const fs = require('fs');

const kpath = 'cert/';
const hostname = '10.0.0.224';
const port = 3388;
// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

const options = {
  key: fs.readFileSync(kpath + hostname + '-key.pem'),
  cert: fs.readFileSync(kpath + hostname + '.pem')
};

// https.createServer(options, function (req, res) {
//   res.writeHead(200);
//   res.end("hello world\n");
// }).listen(8000);

const server = https.createServer(options, (req, res) => {
  let ext, path = '.';
  if (req.url == '/') {
    ext = 'html'
    path += '/index.html'
  } else {
    ext = ''
    path += req.url
    //console.log('hey Tony, something tried to load a file thats not html or js, look in localServer.js');
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/' + ext);

  console.log(path);
  fs.readFile(path, function (err, html) {
    if (err) {
      throw err;
    }
    res.write(html);
    res.end();
  });
}).listen(port, hostname, () => {
  console.log(`started on ${hostname}:${port}`)
})