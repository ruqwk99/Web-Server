// server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const fs = require('fs');
const path = require('path'); // path 모듈 추가

//.ejs 뷰엔진을 실행하기 위한 코드
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//public 미들웨어
app.use(express.static('views')); 
app.use(express.json({
  limit : "50mb"}));
app.use(express.urlencoded({
  limit: "50mb",
  extended: false}));


//라우터       //요청객체, 응답객체
app.get('/', function(req, res){ 
    res.render('이미지 조회 사이트.ejs', {}, function(err ,html){
        if (err)
        console.log(err);
        
        console.log("데이터베이스 HTML구동");

        res.send(html); // 응답 종료
    })
});

app.get('/page2', function(req, res){ 
    res.render('page2.ejs', {}, ()=>{}){
    console.log("HTML-2구동");
});


app.get('/React', function(req, res){  // /receive-message
    app.use(express.static(path.join(__dirname, 'build'))); //React

    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    console.log("React_App 구동");
});

app.listen(3333, function() {
    console.log('App DB-Server on port -3333-');
});
