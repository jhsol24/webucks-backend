const express = require('express')
const router = express.Router()

const userRoute = require('./userRoute')
const productRoute = require('./productRoute')

router.use('/user', userRoute) // '/user' 엔드 포인트를 처리
router.use('/product', productRoute) // '/product' 엔드 포인트를 처리

module.exports = router // 이렇게 내보낸 router 는 express app 의 미들웨어로 사용됩니다.