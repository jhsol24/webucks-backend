const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userDao = require('../models/userDao')

// 회원가입 API (Business Loigic)
const signUp = async (email, passowrd) => {

    // password 길이가 8보다 작을 경우 Error
    if (password.length < 8) {
        const error = new Error('PASSWORD_TOO_SHORT')
        error.statusCode = 400
        throw error
    }

    // user 라는 변수명으로 userDao 에서 쿼리문 가져오기
    const user = await userDao.getUserByEmail(email)

    // 이미 존재하는 유저일 경우 Error 발생
    if (user.length !== 0) {
        const error = new Error('EXISTING_USER')
        error.statusCode = 409
        throw error
    }

    // 비밀번호 토큰화하여 DB 에 INSERT
    // 비즈니스 로직에 맞게 최적화 된 위치에 적용
    const encryptedPW = bcrypt.hashSync(password, bcrypt.genSaltSync())

    // 회원 정보 테이블에 추가 (회원가입 성공)
    const newUser = await userDao.createUser(email, encryptedPW)

    return newUser
}

// 로그인 API (Business Logic)
const signIn = async (email, password) => {

    // user 라는 변수명으로 userDao 에서 쿼리문 가져오기
    const user = await userDao.getUserByEmail(email)
    
    // 회원정보에 없는 email 일 때
    // 유저 정보 Error
    if (user.length === 0) {
        const error = new Error('INVALID_USER')
        error.statusCode = 400
        throw error
    }

    // password 를 암호화 해서
    // DB 상의 password(암호화됨) 와 비교하여
    // 틀리면 Error
    console.log("user 만 불러오는데 pw는? : ", user)
    const isCorrect = bcrypt.compareSync(password, user[0].password)

    if (!isCorrect) {
        const error = new Error('INVALID_USER')
        error.statusCode = 400
        throw error
    }
    
    return jwt.sign({ userId: user[0].id }, process.env.SECRET_KEY)
}

module.exports = { signUp, signIn }