const http = require('http');

http.createServer((req, res)=> {
    res.end('hello node');
})
    .listen(4000, () =>console.log('Oservidor esta rodando'));