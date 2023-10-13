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

const directoryPath = 'test'; // 조회할 디렉토리 경로

app.get('/', function(req, res){  
    res.render('이미지 조회 사이트', {}, function(err ,html){
        if (err)
        console.log(err);
        
        console.log("MAIN EJS구동");

        res.send(html); // 응답 종료
    })

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('디렉토리를 읽을 수 없습니다.', err);
        return;
    }

    console.log('디렉토리 내의 파일 목록:');
    files.forEach((file) => {
        console.log(file);
    });
});
  
});

app.get('/React', function(req, res){  // /receive-message
    app.use(express.static(path.join(__dirname, 'build'))); //React

    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    console.log("React_App 구동");
});

app.get('/Next', function(req, res){ 
  Main_DB.query(`SELECT * FROM test_db`, function(err,test){
    res.render('TEST/events_test', {'DB':test}, function(err ,html){
    // data라는 이름으로 전달         lkye
    // ejs 파일에서는 data[1].a 와 같은 형식으로 사용
        if (err)
        console.log(err);
        
        console.log("DB Main구동");

        res.send(html); // 뿌려주고 응답종료
    })
});
}); 

app.post('/submit_Num', (req, res) => {
    const { value1 } = req.body; // 클라이언트에서 POST 요청으로 보낸 데이터 추출
    console.log("폰번호호스팅 VALUE of DB UPDATA");

    Main_DB.query(`INSERT INTO test_db2 (Num) VALUES (?)`, [value1], (err, result) => {
        if (err) {
            console.error("데이터베이스 쿼리 오류:", err);
            res.status(500).send("서버 오류");
        } 
        else {
            console.log("데이터베이스에 데이터 추가 완료");
            res.status(200).send("Success");
        }
    });
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
