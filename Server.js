const net = require('net');
const express = require('express');
const app = express();

// TCP 서버 생성
const server = net.createServer((socket) => {
  // 클라이언트가 연결될 때 실행됩니다.
  console.log('클라이언트가 연결되었습니다.');

  // 클라이언트로부터 데이터를 받을 때 실행됩니다.
  socket.on('data', (data) => {
    console.log('클라이언트로부터 받은 데이터:', data.toString());
  });

  // 클라이언트 접속이 끊어질 때 실행됩니다.
  socket.on('end', () => {
    console.log('클라이언트 접속이 끊어졌습니다.');
  });

  // 클라이언트와의 연결이 종료될 때 실행됩니다.
  socket.on('close', () => {
    console.log('클라이언트와의 연결이 종료되었습니다.');
  });

  // err 예외처리
  socket.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
     console.log('클라이언트와의 연결이 강제로 끊어짐 -예외처리-');
     // 연결해제
     socket.destroy();
    } else {
    console.error('에러 발생:', err);
    }
 });
});

// 서버가 지정한 포트(예: 3000)에서 대기합니다.
const PORT = 33333;
server.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 대기 중...`);
});

app.listen(3333, function() {
    console.log('Main port Start 3333!');
});
