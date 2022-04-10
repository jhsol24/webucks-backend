const productDao = require('../models/productDao')

const getCategories = async () => {
    return await productDao.getCategories()
}

const getProducts = async () => {
    return await productDao.getProducts()
}

const getProduct = async (id) => {
    return await productDao.getProduct(id)
}

module.exports = { getCategories, getProducts, getProduct }