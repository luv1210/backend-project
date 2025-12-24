const http = require('http');

const server = http.createServer((req, res) => {
    res.write( "this is server page");
    res.end('Hello, World!\n');
}   );
