/*
Node.js가 지원하는 내장 모듈중 OS 모듈을 학습
모듈이란? 함수 집합을 의미(함수를 특정 파일에 모아놓은 단위)
*/
//모듈 로드하기
var os = require("os");
console.log(os.hostname()); //컴퓨터 이름 반환
console.log(os.type()); //운영체제의 이름
console.log(os.release()); //os의 버전
console.log(os.totalmem()); //시스템의 총 메모리
console.log(os.cpus()); //cpu 스펙