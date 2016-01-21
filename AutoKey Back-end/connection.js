
var mysql=require('mysql');

function startConnection (){
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dbkinal2015'
    });
    return con;
};

var db = startConnection();
db.connect();

var connection = {
    query: function(req,res, q){
            db.query(q, function (err,row) {
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
        db.query(q, function(err, row){ });
    }
};
module.exports = connection;