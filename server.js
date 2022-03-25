const http = require('http')
const express = require('express')
const bcrypt = require('bcrypt')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const { sendCategories } = require('./sendCategories')
const { sendProductList } = require('./sendProductList')
const { sendProductDetail } = require('./sendProductDetail')
const { sendUserLogin } = require('./sendUserLogin')


// app 이라는 이름으로 express 사용
const app = express()
// json 객체를 불러오는 res.json 메소드를 사용하기 위해 use 메소드를 사용해 불러오기
app.use(express.json())

// 서버가 켜져있는지 확인
app.get('/', (req, res) => {
  res.json({ message: '/ endpoint' })
})

app.get('/signup', (req, res) => {res.json('signup success')}) // 첫번째 인자에는 endpoint url 을 기입하고,
app.get('/login', (req, res) => {res.json('login success')}) // 각각의 요청에 대해 핸들링 하는 함수를 두번째 인자로 넣습니다.


// 각각의 json 파일을 불러오는 API 경로 설정
app.get('/categories', sendCategories)
app.get('/products', sendProductList)
app.get('/product/2', sendProductDetail)


// 회원가입 API
app.post('/user/signup', async(req, res) => {
  try {
      const { email, password } = req.body

      // email 또는 password 가 입력되지 않으면 Error
      // (custom 예외 처리)
      if (!email || !password) {
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
      }

      // password 길이가 8보다 작을 경우 Error
      if (password.length < 8) {
        const error = new Error('PASSWORD_TOO_SHORT')
        error.statusCode = 400
        throw error
      }

      // email 중복 시 Error
      // 입력 email 과 중복된 데이터가 있는지 검증하는 쿼리문 결과를
      // user 객체에 저장
      // 중복된 데이터가 있으면 Error
      const user = await prisma.$queryRaw`
        SELECT id FROM users WHERE email = ${email}
      `

      if (user.length !== 0) {
        const error = new Error('EXISTING_USER')
        error.statusCode = 409
        throw error
      }

      // 비밀번호 토큰화하여 DB 에 INSERT
      // 비즈니스 로직에 맞게 최적화 된 위치에 적용
      const encryptedPW = bcrypt.hashSync(password, bcrypt.genSaltSync())

      // 회원 정보 테이블에 추가 (회원가입 성공)
      await prisma.$queryRaw`
          INSERT INTO users(email, password) VALUES (${email}, ${encryptedPW});
      `

      return res.status(201).json({ message: "SIGNUP_SUCCESS" })
  } catch (err) {
      console.log(err)
      return res.status(500).json({ message: err.message })
  }
})

// 로그인 API
app.post('/user/login', sendUserLogin)

// 가입된 유저 데이터를 가져오는 API
app.get('/users', async(req, res) => {
  const users = await prisma.$queryRaw`
    SELECT
    id,
    email,
    password,
    username,
    address,
    phone_number,
    policy_agreed,
    created_at
    FROM users
  `
  return res.status(200).json({ users })
})

const server = http.createServer(app)

const start = async () => { // 서버를 시작하는 함수입니다.
  try {
    server.listen(8000, () => console.log('Server is listening on 8000'))
  } catch (err) { 
    console.error(err)
  }
}

start()

// server.listen(8000, () => {
//   console.log('server is listening on PORT 8000')
// })