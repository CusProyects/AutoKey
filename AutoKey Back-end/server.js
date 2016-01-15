/**
 * Created by Gibran Polonsky on 13/01/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');

var puerto = 3000;
var app = express();


app.use(bodyParser.json()   );


app.all("/*", function (req,res,next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/',require('./routes'));

app.set('port', process.env.PORT || puerto );


var server=app.listen(app.get('port'),function(){
    console.log('Servidor iniciado en el puerto ' + puerto);
});

