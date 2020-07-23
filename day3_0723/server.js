var http=require("http");
var url = require("url"); //URL Parser(해석자)
var boardController=require("./boardController");


var server=http.createServer(function(request, response){
    //get or post and retrieve parameter

    //조건문이 필요한 이유? 파라미터 추출방식이 틀리므로 너무 불편
    //이따가 서버 모듈을 개선된 것으로 바꿀 거임
   
    doRequest(request, response);
  
});

function doRequest(request, response){
    var urlJson=url.parse(request.url, true); //true 옵션주면 json 형식으로 반환
    var uri = urlJson.pathname; //도메인:포트 이후부터의 요청 문자열
    var param = urlJson.query; //json형식으로 된 파라미터 객체

    if(uri=="/board/list"){
        boardController.getList(request, response);
    }else if(uri=="/board/detail"){
        boardController.getDetail(request, response);
    }else if(uri=="/board/regist"){
        boardController.insert(request, response);
    }else if(uri=="/board/update"){
        boardController.update(request, response);
    }else if(uri=="/board/delete"){
        boardController.del(request, response);
    }else if(uri=="/board/registForm"){
        //글 등록폼에 대한 요청 처리
        boardController.registForm(request, response);
    }
}

//서버 가동
server.listen(7000, function(){
    console.log("Server is running at 7000 port...");
});
