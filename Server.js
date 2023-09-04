// server.js
const express = require('express');
const mysql = require('mysql');
const app = express();


//.ejs 뷰엔진을 실행하기 위한 코드
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//TEST

//public 미들웨어
app.use(express.static('views')); 
app.use(express.json({
  limit : "50mb"}));
app.use(express.urlencoded({
  limit: "50mb",
  extended: false}));


//라우터       //요청객체, 응답객체
app.get('/', function(req, res){ 

    res.render('onecut.ejs', {}, function(err ,html){
    // data라는 이름으로 전달         lkye
    // ejs 파일에서는 data[1].a 와 같은 형식으로 사용
        if (err)
        console.log(err);
        
        console.log("데이터베이스 HTML구동");

        res.send(html); // 응답 종료
    })
});

app.listen(3333, function() {
    console.log('App DB-Server on port -3333-');
  });