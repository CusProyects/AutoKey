/**
 * Created by Gibran Polonsky on 19/01/2016.
 */

var db = require('./cfg');

var auth = {
    check: function(req, res){
        db.query(req, res, "SELECT * FROM usuario WHERE usuario = '" + req.body.name +"' AND password = MD5('" + req.body.password + "')");
    }
};

module.exports = auth;