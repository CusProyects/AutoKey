/**
 * Created by Gibran Polonsky on 07/03/2016.
 */

var db = require('./connection');

var acierto_pregunta = {

    search: function(req, res){
        db.query(req, res, 'SELECT clave.numeroPregunta, acierto_pregunta.acierto, acierto_pregunta.desacierto FROM acierto_pregunta INNER JOIN clave ON acierto_pregunta.`idClave`  = clave.`idClave` WHERE idFormulario = ' + req.params.idFormulario );
    }

};


module.exports = acierto_pregunta;