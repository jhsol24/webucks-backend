const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
// Route 는 오직 Controller 에만 의존합니다.

router.post('./signup', userController.signUp)
router.post('./login', userController.login)

module.exports = router // 이렇게 내보낸 router 는 부모 router 에 자동으로 연결됩니다.