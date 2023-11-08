const express = require('express');
const { exec } = require('child_process');
const mysql = require('mysql');
const app = express();
const PORT = 3333;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('views')); 

var Main_DB = null; //호스팅DB

// DB 연결생성함수
function createDBConnection(host, user, password, database, port) {
  return mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port,
  });
}

app.get('/', (req, res) => {
    res.render('main22.ejs',{},function(err ,html){
        if (err)
        console.log(err);
  
        console.log("MAIN");

        res.send(html);
    });
});

app.post('/image', (req, res) => {
  Main_DB = createDBConnection('svc.sel5.cloudtype.app', 'root', '9999', 'mariadb', '30095');

  Main_DB.query('SELECT * FROM Kakao', (err) => {
    if (err) {
      console.log(err);
    } 
    else {
      var newTitle = 'UPDATE';
      var sql = 'UPDATE Kakao SET title=? WHERE id=?';
      var params = [newTitle, 0];
      Main_DB.query(sql, params, function (err, rows, fields) {
        if (err) {
          console.log(err);
        } 
        else {
          console.log('Base64_Encoded_Image');
        }
        Main_DB.end();
      });
    }
  });
  res.status(200).send("ok");
});

app.post('/Incoding', (req, res) => {

  Main_DB = createDBConnection('svc.sel5.cloudtype.app', 'root', '9999', 'mariadb', '30095');
    console.log("인코딩 확인중..");
  function checkCondition() {
    Main_DB.query(`SELECT * FROM Kakao`, function(err, test) {
      if (test[0].title === 'FALSE') {
        res.status(200).send("ok");
        console.log('인코딩_완료')
        Main_DB.end();
      } 
      else {
        setTimeout(checkCondition, 1000); // 1초마다 확인
      }
    });
  }
  checkCondition(); // 콜백함수 / 조건확인시작 
});

app.post('/getTEST', (req, res) => {
  console.log("데이터 추출 / 디코딩 작업 중..");
  Main_DB = createDBConnection('svc.sel5.cloudtype.app', 'root', '9999', 'mariadb', '30095');

    Main_DB.query(`SELECT * FROM Kakao`, function(err, test) {
        const image99 = test[0].name;
        res.status(200).json({ name: image99 });
        Main_DB.end(); console.log('클라우드DB 해제');
    });
});


app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  const chromeCommand = `start chrome http://localhost:${PORT}`;
  exec(chromeCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Failed to open Google Chrome: ${error}`);
    } else {
      console.log(`Opened Google Chrome to http://localhost:${PORT}/!`);
    }
  });
});