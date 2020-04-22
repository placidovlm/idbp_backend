var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

var pedidos = require('./pedidos');
app.use('/pedidos', pedidos);

var igrejas = require('./igrejas');
app.use('/igrejas', igrejas);

app.listen(80, function () {
  console.log('idpb_backend app listening on port 80!');
});