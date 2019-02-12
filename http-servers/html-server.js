const http = require('http');
const fs = require('fs');
const port = 8080;
const htmlDirectory = './html/index.html';
const myMessage = 'My Replaced Message';
const Readable = require('stream').Readable;

http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    const data = fs.readFileSync(htmlDirectory, 'utf8');
    // response.end(data.replace('{message}', myMessage));
    let s = new Readable;
    s.push(data.replace('{message}', myMessage));
    s.push(null);
    s.pipe(response);
}).listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`);
});