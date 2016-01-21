/**
 * Created by Gibran Polonsky on 19/01/2016.
 */


var mysql=require('mysql');

function startConnection (){
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cfgdbkinal'
    });
    return con;
};


var cfgDb = startConnection();
cfgDb.connect();

var cfg = {
    query: function(req,res, q){
        cfgDb.query(q, function (err,row) {
            if(!err){
                if(row.length > 0){
                    res.json(row);
                }else{
                    res.json(false);
                }
            }else{
                console.log(err);
            }
        });
    },
    sentence: function(req, res, q){
        cfgDb.query(q, function(err, row){ });
    }
};

module.exports=cfg;