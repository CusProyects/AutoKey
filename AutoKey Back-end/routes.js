/**
 * Created by Gibran Polonsky on 13/01/2016.
 */

var express = require('express');

var connection = require('./connection');

var clave = require('./clave');

var auth = require('./auth');

var formulario = require('./formulario');

var asignatura = require('./asignatura');

var instructor = require('./instructor');

var db = ('./connection');


var route = express();

route.post('/auth',  auth.check);

route.post('/clave', clave.set);

route.get('/clave/:idFormulario', clave.search);

route.post('/formulario', formulario.save);

route.get('/formulario', formulario.last);

route.get('/formulario/:idInstructor', formulario.search);

route.get('/asignatura', asignatura.all);

route.get('/asignatura/:idAsignatura', asignatura.search);

route.get('/instructor/:idUsuario', instructor.search);


module.exports = route;
