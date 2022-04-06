const http = require('http')
const express = require('express')
const routes = require('./routes')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// app 이라는 이름으로 express 사용
const app = express()
// json 객체를 불러오는 res.json 메소드를 사용하기 위해 use 메소드를 사용해 불러오기
app.use(express.json())
app.use(routes) // Route 에 의존성을 가집니다.

// 서버가 켜져있는지 확인
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

const server = http.createServer(app)
const PORT = process.env.PORT

const start = async () => { // 서버를 시작하는 함수입니다.
  try {
    server.listen(PORT, () => console.log('Server is listening on 8000'))
  } catch (err) { 
    console.error(err)
    await prisma.$disconnect() // 에러 발생 시 database 연결 종료
  }
}

start()