const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const sendProductList = async (req, res) => {
  const products = await prisma.$queryRaw`
    SELECT
      p.id AS id,
      p.korean_name AS koreanName,
      p.english_name AS englishName,
      c.name AS categoryId,
      pi.image_url AS imageUrl
    FROM products p
    JOIN categories c ON p.category_id = c.id
    JOIN product_images pi on pi.product_id = p.id
    `

  return res.status(201).json({ products });
  }
  
  module.exports = { sendProductList } // routing.js 에서 사용하기 위해 모듈로 내보낸다.