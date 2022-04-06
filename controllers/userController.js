const userService = requiere('../services/userService')

// 회원가입 API
const signUp = async(req, res) => {
    
    try {
        const { email, password } = req.body

        // email 또는 password 가 입력되지 않으면 Error
        // (custom 예외 처리)
        if (!email || !password) {
            const error = new Error('KEY_ERROR')
            error.statusCode = 400
            throw error
        }

        // Controller 에서 Service 호출, signUp(회원가입) 함수 호출
        await userService.signUp(email, password)

        

        

        return res.status(201).json({ message: "SIGNUP_SUCCESS" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// 로그인 API
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
  
        // email 또는 password 가 입력되지 않으면 Error
        // (custom 예외 처리)
        if (!email || !password) {
          const error = new Error('KEY_ERROR')
          error.statusCode = 400
          throw error
        }
  
        // const token = jwt.sign({ userId: user[0].id }, process.env.SECRET_KEY)
        const token = await userService.signIn(email, password)
  
        return res.status(200).json({ message: "LOGIN_SUCCESS", jwt : token })
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({ message: err.message })
    }
}

module.exports = {
	signUp,
    signIn
}