var http=require("http");
var url=require("url"); //내부모듈(not need to install)
var qs=require("querystring");

var server=http.createServer(function(request, response){
    // get or post에 상관없이 하나의 함수로 요청처리를 몰아버리자!
    console.log(request.method);
    if(request.method=="GET"){
        //get 방식에서의 파라미터 추출
       
        var urlObj=url.parse(request.url,true); //json
        var uri=urlObj.pathname;
        var param=urlObj.query;
        console.log(param);
        doRequest(param);
    }else if(request.method=="POST"){
        //post 방식에서의 파라미터 추출
        
        var count=0;
        var content="";//post를 모아놓을 변수
        request.on("data",function(data){
            count++;
            content+=data;

            console.log("count is %d", count);
            //post된 데이터를 파싱해주는 모듈 사용해야함!
            //QueryString 모듈을 이용해보자!
            var param = qs.parse(content);
            doRequest(param);
        });
    }
});

function doRequest(param){
    console.log("doRequest() 메서드 동작함");
    var id=param.id;
    var pass=param.pass;
    console.log("넘겨받은 id는 %s, pass는 %s", id, pass);
}

server.listen(8000, function(){
    console.log("server is running at 8000 port....");
});