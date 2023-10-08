const net = require('net');
const http = require('http');
const express = require('express');
const app = express();


// HTTP 서버 생성
const server = http.createServer((req, res) => {
  // HTTP 요청을 처리하는 부분
  res.writeHead(200, { 'Content-Type': 'text/plain' }); // 응답 헤더 설정
  res.end('안녕, HTTP 서버!'); // 응답 본문 설정
});

const PORT = 33333; // 사용할 포트 번호

// 서버를 지정한 포트에서 대기
server.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 대기 중...`);
});

app.listen(3333, function() {
    console.log('Main port Start 3333!');
});
