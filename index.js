var express = require('express');
var path = require('path');
var http = require('http');
var json = require('json');

var app = express();

var publicPath = path.resolve(__dirname, "view");
app.use(express.static(publicPath));

app.get('/api/proof', (req, res, next) => {
    res.json(require('./proofs/1/1.json'));
});    

app.use(function(request, response){
    response.writeHead(200, {"Content-Type":"text/plain" });
    response.end("You didn't find a static file.");
});

http.createServer(app).listen(3000);

