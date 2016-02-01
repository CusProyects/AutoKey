/**
 * Created by Gibran Polonsky on 19/01/2016.
 */

var db = require('./connection');

var asignatura = {
    all: function(req, res){
        db.query(req, res, "SELECT * FROM asignatura WHERE idNivel =" + req.params.idNivel);
    },
    search: function(req, res){
        db.query(req, res, "SELECT * FROM asignatura WHERE idAsignatura = '" + req.params.idAsignatura + "'");
    }
};





module.exports = asignatura;