var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//요청을 처리할 하위 컨트롤러 역할의 js파일들
var indexRouter = require('./routes/index');
//board.js로 정의돈 개발자 정의 모듈을 라우터로 이용하겠다!
//(요청을 처리하는 컨트롤러로 이용)
var boardRouter = require('./routes/board');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//사용할 동적 view
app.set('view engine', 'ejs'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//정적자원의 위치
//__dirname : node.js에서 자체 지원하느 전역변수
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //메인 요청 처리
app.use('/board', boardRouter); //게시판 요청 처리

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
