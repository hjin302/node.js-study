/*
사용자 정의 모듈을 이용해보자!
모듈을 파일로 저장하고, 불러오기!
*/
var math = require("./myobj.js");

console.log(math.sum(3,4));
console.log(math.multi(3,4));