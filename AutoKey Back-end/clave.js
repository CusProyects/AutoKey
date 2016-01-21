/**
 * Created by Gibran Polonsky on 13/01/2016.
 */
    var db = require('./connection');

var clave = {
    set: function(req, res){
        var claves1 = req.body.claves1;
        var claves2 = req.body.claves2;
        var claves3 = req.body.claves3;

        for (var i in claves1) {
            db.sentence(req, res, 'INSERT INTO  clave(idFormulario, numeroPregunta, valor, respuesta, tipoPregunta) VALUES(' +
                '"' + claves1[i].idFormulario+ '", "' + claves1[i].numeroPregunta+ '", "' + claves1[i].valor+ '", "' + claves1[i].respuesta+ '", "1")');
        }
        for (var i in claves2) {
            db.sentence(req, res, 'INSERT INTO  clave(idFormulario, numeroPregunta, valor, respuesta, tipoPregunta) VALUES(' +
                '"' + claves2[i].idFormulario+ '", "' + claves2[i].numeroPregunta+ '", "' + claves2[i].valor+ '", "' + claves2[i].respuesta+ '", "1")');
        }
        for (var i in claves3) {
            db.sentence(req, res, 'INSERT INTO  clave(idFormulario, numeroPregunta, valor, respuesta, tipoPregunta) VALUES(' +
                '"' + claves3[i].idFormulario+ '", "' + claves3[i].numeroPregunta+ '", "' + claves3[i].valor+ '", "' + claves3[i].respuesta+ '", "1")');
        }

        res.json(true);
    },
    search: function(req, res){
        db.query(req, res, "SELECT * FROM clave WHERE idFormulario = " + req.params.idFormulario );
    }
};


module.exports = clave;