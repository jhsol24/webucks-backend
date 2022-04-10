const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
// Route 는 오직 Controller 에만 의존 합니다.

// 카테고리 API
router.get('/categories', productController.getCategories)
// 상품 리스트 API
router.get('', productController.getProducts)
// 상품 상세 페이지 API
router.get('/:id', productController.getProduct)

module.exports = router
// 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.