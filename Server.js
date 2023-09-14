// server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const fs = require('fs');

const newData = {
    name: 'Jane',
    age: 25,
    city: 'Los Angeles'
};

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

    res.render('이미지 조회 사이트.ejs', {}, function(err ,html){
    // data라는 이름으로 전달         lkye
    // ejs 파일에서는 data[1].a 와 같은 형식으로 사용
        if (err)
        console.log(err);
        
        console.log("데이터베이스 HTML구동");

        res.send(html); // 응답 종료
    })
});

app.post('/api/data', (req, res) => {
  //const data = { message: 'Hello from Node.js server!' };
  //res.json(data);
  console.log("통신확인!");
  fs.readFile('data.json', 'utf8', (readErr, existingData) => {
    if (readErr) {
        console.error('파일 읽기 중 오류가 발생했습니다.', readErr);
    } else {
        try {
            // 기존 데이터 파싱
            const parsedData = JSON.parse(existingData);

            // 새로운 데이터를 배열에 추가
            parsedData.push(newData);

            // 수정된 데이터를 파일에 다시 쓰기
            fs.writeFile('data.json', JSON.stringify(parsedData, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('파일 저장 중 오류가 발생했습니다.', writeErr);
                } else {
                    console.log('데이터가 파일에 추가되었습니다.');
                }
            });
        } catch (parseError) {
            console.error('JSON 데이터 파싱 중 오류가 발생했습니다.', parseError);
        }
    }
});
  res.status(200).send("요청이 성공적으로 처리되었습니다.");
});

app.get('/React', function(req, res){  // /receive-message

    res.render('onecut.ejs', {}, function(err ,html){
    // data라는 이름으로 전달         lkye
    // ejs 파일에서는 data[1].a 와 같은 형식으로 사용
        if (err)
        console.log(err);
        
        console.log("데이터베이스 재HTML구동");

        res.send(html); // 응답 종료
    })
});

app.listen(3333, function() {
    console.log('App DB-Server on port -3333-');
  });
