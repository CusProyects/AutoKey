/**
 * Created by Gibran Polonsky on 20/01/2016.
 */

var db = require('./connection');

var instructor = {
    search: function(req, res){
        //db.sentence(req, res, "INSERT INTO formulario(idAsignatura, idInstructor, copias, forma, fecha) VALUES('"+  +"', '"+ +"', '"+  +"', '"+  +"', '" + +"');")
        db.query(req, res, "SELECT * FROM instructor WHERE idUsuario = " + req.params.idUsuario);
    }
};

module.exports = instructor;