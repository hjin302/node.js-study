/*서버 모듈(메서드 집합) 가져오기 */
var http=require("http"); //내부 모듈 가져오기
var fs=require("fs"); //파일 입출력 모듈
var url=require("url"); //url 해석 모듈
//순수 url과 파라미터 등을 분리시켜 이해
var mysql=require("mysql"); //mysql 외부모듈

//전역변수, 상수
const conStr={
    url:"localhost:3306",
    user:"root",
    password:"1234",
    database:"nodejs"
}

//서버 객체 얻기
var server = http.createServer(function(request, response){
    //console.log("요청 발견!");

    //클라이언트의 요청이 무엇인지 분석!
    var result=url.parse(request.url, true); //해석
    //console.log("클라이언트의 요청 URL : ", result);
    var uri=result.pathname; //순수 요청 URI
                                         //jsp의 request.getRequestURI()와 동일
    

    //클라이언트 요청에 따른 분기!
    if(uri=="/member/loginForm"){
        //console.log("로그인을 원하는 군요");

        //post 방식의 요청 받기
        //post 데이터는 header가 아닌 body로 전송되므로
        //url 타고 전송되는 데이터로는 분석 불가
        //request.on("data", function(data){
        //    console.log(data);
        //});

        //파라미터 받기!
        //console.log("id 파라미터 정보 : ", result.query.id);

        //요청에 응답하자!
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
        //응답정보를 텍스트로 일일이 처리하면 너무 유지보수성이 떨어지므로, 
        //html 파일을 읽어들여서, 그 데이터를 전송하자!
        fs.readFile("loginForm.html","utf8",function(error, data){
            //console.log(data);
            response.end(data);
        });
    }else if(uri=="/member/regist"){
        regist(request, response);
    }else if(uri=="/member/login"){
       loginCheck(request,response);
    }else if(uri=="/member/registForm"){
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
        fs.readFile("registForm.html","utf8",function(error, data){
            response.end(data);
        });
    }else if(uri=="/images/img_1.jpg"){
        response.writeHead(200,{"Content-Type":"image/jpeg"});
        fs.readFile("./images/img_1.jpg",function(err,data){
            response.end(data);
        });
    }else{
        response.writeHead(404,{"Content-Type":"text/html;charset=utf-8"})
        response.end("요청하신 자원은 서버에 없습니다.");
    }
    
}); 

//요청 객체를 넘겨받아 파라미터 추출
function regist(request, response){
    var result=url.parse(request.url, true); //true인 경우 json 형태의 파라미터 반환

    var id=result.query.id;
    var pass=result.query.pass;
    //mysql 접속
    var client = mysql.createConnection(conStr);

    var sql="insert into member(id,pass)";
    sql+=" values(?,?)";
    client.query(sql, [id,pass],function(err,fields){
        //응답!
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        if(err){
            console.log("등록실패");
            response.end("등록실패")
        }else{
            console.log("등록성공");
            response.end("등록성공")
        }
        client.end(function(error){
            console.log("Connection end ...");
        });
        
    }); //쿼리문 수행 메서드
    
}

function loginCheck(request, response){
    var result=url.parse(request.url, true); //true인 경우 json 형태의 파라미터 반환

    var id=result.query.id;
    var pass=result.query.pass;

    var client = mysql.createConnection(conStr);
    var sql="select * from member where id=? and pass=?";

    client.query(sql,[id,pass], function(err, result, fields){
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        console.log(result[0]);
        if(result[0]==undefined){
            response.end("로그인 정보가 올바르지 않습니다.");
        }else{
            //response.end(result[0].id+" 님 안녕하세요");
            response.render();
            fs.readFile("loginResult.ejs","utf8",function(err, data){
                response.end(data);
            });
        }
        client.end(function(error){
            console.log("Connection close...");
        });
    });
}
//서버가 가동되면, 두번째 인수로 전달된 익명함수를 node.js측에서 호출해 준다..
//이와 같이 특정 이벤트 발생시 개발자가 정의해놓은 함수를, 
//시스템이 호출하는 방식을 callback 방식이라 한다.
server.listen(8888,function(){
    console.log("server is running at 8888 port....")
});