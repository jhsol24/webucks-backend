const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const sendUserLogin = async (req, res) => {
  try {
      const { email, password } = req.body

      // email 또는 password 가 입력되지 않으면 Error
      // (custom 예외 처리)
      if (!email || !password) {
        console.log(email, password)
        const error = new Error('KEY_ERROR')
        error.statusCode = 400
        throw error
      }

      // 회원정보에 없는 email 일 때
      // 유저 정보 Error
      const user = await prisma.$queryRaw`
        SELECT id FROM users WHERE email = ${email}
      `

      if (user.length === 0) {
        const error = new Error('INVALID_USER')
        error.statusCode = 400
        throw error
      }

      // password 를 암호화 해서
      // DB 상의 password(암호화됨) 와 비교하여
      // 틀리면 Error
      

      const encryptedPW = await prisma.$queryRaw`
        SELECT password FROM users WHERE email = ${email}
      `
      // console.log("encryptedPW : ", encryptedPW[0].password);
      // console.log("encryptedInputPW : ", encryptedInputPW);

      const isCorrect = bcrypt.compareSync(password, encryptedPW[0].password)

      if (!isCorrect) {
        const error = new Error('INVALID_USER')
        error.statusCode = 400
        throw error
      }

      const token = jwt.sign({ userId: user[0].id }, process.env.SECRET_KEY)

      return res.status(201).json({ message: "LOGIN_SUCCESS", jwt : token })
  } catch (err) {
      console.log(err)
      return res.status(500).json({ message: err.message })
  }
}

module.exports = { sendUserLogin } // routing.js 에서 사용하기 위해 모듈로 내보낸다.