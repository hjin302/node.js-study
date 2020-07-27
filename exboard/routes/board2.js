var express = require('express');
var router = express.Router();
var oracledb = require("oracledb");

var pool;
oracledb.createPool({
  user:"c##pet",
  password:"1234",
  connectString:"localhost/XE"
}, function(err, conPool){
  if(err){
    console.log(err);
  }else{
    pool=conPool;
  }
});

/* GET users listing. */
router.get('/list', function(request, response, next) {
  var sql="select * from board";
  oracledb.getConnection(pool, function(error, con){
    if(error){
      console.log(error);
    }else{
      con.execute(sql, function(err, result){
        if(err){
          console.log(err);
        }else{
          console.log(result);
        }
      });
    }
    con.close(function(e){});
  });
  response.render("board/list");
});

module.exports = router;