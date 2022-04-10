const productService = require('../services/productService')

const getCategories = async (req, res) => {
    return await productService.getCategories()
}

const getProducts = async (req, res) => {
    return await productService.getProducts()
}

const getProduct = async (req, res) => {
    return await productService.getProduct()
}

module.exports = { getCategories, getProducts, getProduct }