/*
process는 시스템 정보와 관련된 객체
env : 환경변수 출력!
*/

var x = 0;
function test(){
	console.log(x);
}
setInterval(test, 1000);

/*
setInterval(function(){
	console.log("a");
}, 100);
*/