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

var Main_DB = mysql.createConnection({
  host:'svc.sel5.cloudtype.app',
  user:'root',
  password:'9999',
  database:'mariadb',
  port:'30095',
});

Main_DB.connect();


//라우터       //요청객체, 응답객체
app.get('/', function(req, res){ 
    res.render('카톡', {}, function(err ,html){
        if (err)
        console.log(err);
        
        console.log("데이터베이스 HTML구동");

        res.send(html); // 응답 종료
    })
});

app.get('/page2', (req, res) => {
    res.render('page2', {}, function(err ,html){
        if (err)
        console.log(err);
        
        console.log("데이터베이스 HTML구동");

        res.send(html); // 응답 종료
    })
});

app.get('/React', function(req, res){  // /receive-message
    app.use(express.static(path.join(__dirname, 'build'))); //React

    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    console.log("React_App 구동");
});

app.listen(3333, function() {
    console.log('App DB-Server on port -3333-');
});

app.get('/DB_data', (req, res) => {
  Main_DB.query('SELECT * FROM my_db', (err, DB) => {
    if (err) throw err;

    let events = [];

    for (var i = 0; i < DB.length; i++) {
      const date = new Date(DB[i].TIME);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split('T')[0];

      const formattedValue = DB[i].TEXT.replace(/\r?\n/g, '<br>').replace(/ /g, '&nbsp;');
      const time = formattedDate;


      events.push({
        Value: formattedValue,
        Timezone: time,
      });
    }

    // 데이터를 HTML 템플릿에 전달하여 렌더링
    res.render('events', { events: events });
  });
});
