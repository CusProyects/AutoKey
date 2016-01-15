/**
 * Created by Gibran Polonsky on 13/01/2016.
 */

var express = require('express');

var connection = require('./connection');

var clave = require('./clave');

var route = express();

route.get('/', function(req, res){
    connection.query(req, res, "SELECT * FROM aspirante");
});

route.post('/clave', clave.set);

module.exports = route;
