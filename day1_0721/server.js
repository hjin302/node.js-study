/*
웹 서버 구축하기!!
톰캣은 이미 구축 완료된 솔루션이라서, 이용만 하면 되었지만 
Node.js의 서버는 http모듈을 이용하여 개발자가 세세히 제어할 수 있다..
*/

var http = require("http");//내장된 모듈
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(request, response){//서버 객체 얻기!
   //클라이언트의 요청을 분석하여 알맞는 컨텐츠를 보여줘야 한다.
   console.log("요청 url : ", request.url);

   //url에는 파라미터가 포함되어서 판단되어지면 안됨에도 불구하고
   //request.url 속성을 그대로 사용한다면, 파라미터조차 url에 포함되어져 판단된다!
   //해결책) url 전문적으로 해석(parsing)할 수 잇는 모듈이 요구됨
   var result=url.parse(request.url);
   console.log("param",result.query);
   console.log("url",result.pathname);

   if(request.pathname=="/ball2.png"){
      //클라이언트에 이미지 응답정보 보내기
      response.writeHead(200,{"Content-Type":"image/png"});
      fs.readFile("./images/ball2.png", function(error, data){
      response.end(data); //body에 적재될 내용
   });
   }else if(request.pathname=="/test.html"){
      response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"}); //header 정보구성   
      fs.readFile("test.html", "utf8", function(error, data){
      response.end(data); //body에 적재될 내용
      });
   }else{
      response.writeHead(404,{"Content-Type":"text/html;charset=utf-8"}); //header 정보구성 
   }
   /*
   response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"}); //header 정보구성   
   fs.readFile("test.html", "utf8", function(error, data){
      response.end(data); //body에 적재될 내용
   });
   */

   
   
});

//요청을 받는 처리~
/*
server.on("request", function(){
   console.log("요청 발견");
});
*/

server.listen(7979, function(){
   console.log("the server is running at 7979 port...");
});