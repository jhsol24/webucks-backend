const productService = require('../services/productService')
const jwt = require('jsonwebtoken')

// 로그인 했을 때만 category 리스트가 보여짐
const getCategories = async (req, res) => {
    console.log(req.headers.token)
    try {
        if (req.headers.token === undefined) {
            const error = new Error('LOGIN_REQUIRED')
            error.statusCode = 401
            throw error
        }

        const token = req.headers.token
        const { userId } = jwt.verify(token, process.env.SECRET_KEY)
        console.log("userId : ", userId)

        const categories = await productService.getCategories()
        res.status(200).json({ message : `Welcome! Customer ${userId}`, categories })
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({ message : err.message })
    }
}

const getProducts = async (req, res) => {
    try {
        const { categoryId } = req.body
        const products = await productService.getProducts(categoryId)

        res.status(200).json({ products })
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({ message : err.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await productService.getProduct(id)

        res.status(200).json({ product })
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({ message : err.message })
    }
}

module.exports = { getCategories, getProducts, getProduct }