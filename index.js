var express = require('express');
var json = require('json');
var massive = require('massive');
var bodyParser = require('body-parser');
var http = require('http');
const {dbUser, dbPass, database} = require('./config.js');

var app = express();

var publicPath = 'view';
app.use(bodyParser.json());

massive(`postgres://${dbUser}:${dbPass}@localhost/${database}`).then(function(db){
    app.set('db', db)}).catch(function(e){console.log(e);});
							      
app.use(express.static(publicPath));

app.get('/api/proof', (req, res, next) => {
    res.json(require('./proofs/1/1.json'));
});    

app.get('/test', (req, res, next) => {
    app.get('db').massive_example.find({}).then( results => {
	res.json(results);
    }).catch( e => {
	res.json(e);
    });
});
							      
http.createServer(app).listen(3000);

