const http = require('http');
const port = 8080;

//client sends data to server and server returns back same data to server
http.createServer((request, response) => {
    request.on('data', (chunk) => {
        response.write(chunk);
    }).on('end', () => {
        response.end();
    });
}).listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`);
});