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

var acierto = require('./acierto_pregunta');

var db = ('./connection');


var route = express();

route.post('/auth',  auth.check);

route.post('/clave', clave.set);

route.get('/clave/:idFormulario', clave.search);

route.post('/formulario', formulario.save);

route.get('/formulario', formulario.last);

route.get('/formulario/get/:idFormulario', formulario.get);

route.get('/formulario/all', formulario.all);

route.delete('/formulario/:idFormulario', formulario.del);


route.get('/formulario/:idInstructor', formulario.search);

route.get('/asignatura/nivel/:idNivel', asignatura.all);

route.get('/asignatura/:idAsignatura', asignatura.search);

route.get('/instructor/usuario/:idUsuario', instructor.search);

route.get('/instructor/:idInstructor', instructor.get);

route.get('/acierto/:idFormulario', acierto.search)


module.exports = route;
