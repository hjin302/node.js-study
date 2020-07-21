/*
Node.js란?
- 자바스크립트 기반의 응용프로그램이다!
- 하지만, 웹서버를 구축하는데 많은  api가 지원된다!
  따라서 주 용도는 웹서버 구축, 채팅서버, 실시간 처리 IOT 분야 등등...

node.js가 지원하는 전역객체중 console 객체에 대해 알아보자!!
*/

/*
	%s : 문자열
	%d : 숫자
	%j : json
*/
//console.log();

//실행타임측정(컴퓨터성능!)
console.time("t1"); //타이머 시작
var sum=0;
for(var i=1; i<=10000	; i++){
	sum += i;
}
console.timeEnd("t1");
