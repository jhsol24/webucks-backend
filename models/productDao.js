const { PrismaClient, prisma } = require("@prisma/client");

const PrismaClient = new PrismaClient()

const getCategories = async () => {
    return await prisma.$queryRaw`
        SELECT id, name FROM categories;
    `
}

const getProducts = async () => {
    return await productDao.getProducts()
}

const getProduct = async (id) => {
    return await productDao.getProduct(id)
}

module.exports = { getCategories, getProducts, getProduct }