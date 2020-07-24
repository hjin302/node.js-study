/*
지금까지 사용했던 웹서버 모듈인 http는 개발자가 세세하게 처리할 업무가 너무 많다...
따라서 훨씬 더 개선된 모듈을 사용해보자
connect 모듈: http를 개선하여 코드량이 줄어듦
express모듈 : connect 모듈을 개선한 모듈
*/
var http=require("http");
var express = require("express"); //설치 필요
var mysql=require("mysql"); //실치 필요
var bodyParser = require("body-parser"); //설치 필요

const conStr={
    url:"localhost:3306",
    user:"root",
    password:"1234",
    database:"nodejs"
}
//express 모듈의 인스턴스 생성
var app=express();
var server = http.createServer(app);

//정적자원인 경우 요청처리에대해 별도의 로직을 작성해야할까?
//javaEE 분야에서는 정적자원에대해 defaultServlet이 처리해준다
// image, css, html 등은 별도 처리를 하지 않았다.
//express 모듈을 이용하여 정적자원의 처리
//express 모듈을 이용하면, 미들웨어라는 메서드를 이용할 수 잇다
//node.js가 지원하는 전역변수 중 __dirname은 
//현재 웹서버의 경로를 반환해준다
console.log("현재 웹서버의 물리적 하드 경로는 ", __dirname);
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({"extended":false}));
app.use(bodyParser.json());


//등록
app.post("/map/regist", function(request, response){
    var client = mysql.createConnection(conStr);
    var sql = "insert into store(lati, longi, name) values(?,?,?)";
    //post 방식의 파라미터 받기 (데이터가 body로 전송됨)
    var lati = request.body.lati;
    var longi = request.body.longi;
    var name = request.body.name;

    client.query(sql, [lati, longi, name],function(error, fields){
        response.writeHead(200, {"Content-Type":"text/json;charset=utf-8"});
        if(error){
            console.log(error);
            var json={
                resultCode:0
            };
        }else{
            var json={
                resultCode:1
            };
        }
        response.end(JSON.stringify(json)); //문자열로 변환하여 응답
        client.end(function(err){
            if(err){
                console.log(err);
            }else{
                console.log("connection closed");
            }
        });
    });

});

//목록 가져오기
app.get("/map/list", function(request,response){
    var client = mysql.createConnection(conStr);
    var sql="select * from store";

    client.query(sql, function(error, result, fields){
        response.writeHead(200, {"Content-Type":"text/json;charset=utf-8"});
        if(error){
            console.log(error);
        }else{
            response.end(JSON.stringify(result)); //문자열로 변환하여 응답
        }
        client.end(function(err){

        });
    });
});

app.get("/map/detail", function(request,response){
    //파라미터 추출
    var store_id=request.query.store_id;
    console.log("store_id is ", store_id);

    var client = mysql.createConnection(conStr);
    var sql="select * from store where store_id=?";
    client.query(sql, [store_id], function(error, result, fields){
        response.writeHead(200, {"Content-Type":"text/json;charset=utf-8"});
        if(error){
            console.log(error);
        }else{
            response.end(JSON.stringify(result)); //문자열로 변환하여 응답
        }
        client.end(function(err){

        });
    });

});

app.get("/map/del", function(request, response){
    var store_id=request.query.store_id;
    var sql="delete from store where store_id=?";
    var client=mysql.createConnection(conStr);
    client.query(sql, [store_id], function(error, fields){
        var json;
        response.writeHead(200, {"Content-Type":"text/json;charset=utf-8"});
        if(error){
            json={
                resultCode:0
            }
        }else{
            json={
                resultCode:1
            }
        }
        response.end(JSON.stringify(json)); //문자열로 변환하여 응답
        client.end(function(err){

        });
    });
})

//수정 요청 처리
app.post("/map/edit", function(request, response){
    var store_id = request.body.store_id;
    var lati = request.body.lati;
    var longi = request.body.longi;
    var name = request.body.name;

    var client = mysql.createConnection(conStr);
    var sql = "update store set lati=?, longi=?, name=?";
    sql += " where store_id=?";
    
    client.query(sql, [lati, longi, name, store_id],function(error, fields){
        var json;
        response.writeHead(200, {"Content-Type":"text/json;charset=utf-8"});
        if(error){
            json={
                resultCode:0
            }
        }else{
            json={
                resultCode:1
            }
        }
        response.end(JSON.stringify(json)); //문자열로 변환하여 응답
        client.end(function(err){

        });
    });

});







server.listen(8989,function(){
    console.log("Server is running at 8989 port...");
})