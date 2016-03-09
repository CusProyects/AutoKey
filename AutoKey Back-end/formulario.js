/**
 * Created by Gibran Polonsky on 19/01/2016.
 */

var db = require('./connection');

var formulario = {

    get: function(req, res){

        db.query(req, res, "SELECT * FROM formulario WHERE idFormulario =" +  req.params.idFormulario);
    },

    save: function(req, res){

        Date.prototype.yyyymmdd = function() {
            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
            var dd  = this.getDate().toString();
            return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
        };

        d = new Date();
        db.sentence(req, res, "INSERT INTO formulario(idAsignatura, idInstructor, copias, forma, fecha, jornada, bachiller, grado, bimestre) VALUES('"+ req.body.idAsignatura  +"', '"+ req.body.idInstructor +"', '"+ req.body.copias  +"', '"+ req.body.forma +"', '" + d.yyyymmdd() +"', '"+ req.body.jornada +"', '"+ req.body.bachiller +"', '"+ req.body.grado +"', '"+ req.body.bimestre + "');");
        res.json(true);
    },
    last: function(req, res){
        db.query(req, res, "SELECT * FROM formulario ORDER BY idFormulario DESC LIMIT 1");
    },
    search: function(req, res){
        db.query(req, res, "SELECT * FROM formulario WHERE idInstructor = " + req.params.idInstructor);
    },
	all: function(req, res){
		db.query(req, res, "SELECT * FROM formulario ");
	},
	del: function(req, res){
		db.sentence(req, res, "DELETE FROM clave WHERE idFormulario = " + req.params.idFormulario);
		db.sentence(req, res, "DELETE FROM formulario WHERE idFormulario = " + req.params.idFormulario);
		res.send(true);
	}
};





module.exports = formulario;