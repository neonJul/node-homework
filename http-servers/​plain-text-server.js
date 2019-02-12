const http = require('http');
const port = 8080;

http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.end('Hello World')
}).listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`);
});