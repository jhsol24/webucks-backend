const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const getCategories = async () => {
    return await prisma.$queryRaw`
        SELECT id, name FROM categories;
    `
}

const getProducts = async (categoryId) => {
    return await prisma.$queryRaw`
        SELECT
            p.id,
            p.korean_name,
            p.english_name,
            c.id AS categoryId,
            c.name,
            pi.image_url
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN product_images pi ON p.id = pi.product_id
        WHERE c.id = ${categoryId}
    `
}

const getProduct = async (id) => {
    return await prisma.$queryRaw`
        SELECT
            p.id AS id,
            p.korean_name AS koreanName,
            p.english_name AS englishName,
            JSON_ARRAYAGG(a.name)
        FROM products p
        JOIN product_images pi ON pi.product_id = p.id
        LEFT join product_allergies pa ON pa.product_id = p.id
        LEFT join allergies a ON pa.allergy_id = a.id
        WHERE p.id = ${id}
        GROUP BY p.id
    `
}

module.exports = { getCategories, getProducts, getProduct }