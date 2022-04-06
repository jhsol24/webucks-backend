const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

// email 중복 시 Error 발생을 위해
// 입력 email 과 중복된 데이터가 있는지 검증하는 쿼리문
const getUserByEmail = async (email) => {
    return await prisma.$queryRaw`
        SELECT id FROM users WHERE email = ${email}
    `
}

const getUserWithPasswordByEmail = async (email) => {
    return await prisma.$queryRaw`
        SELECT id, password FROM users WHERE email = ${email}
    `
}

const createUser = async (email, encryptedPW) => {
    return await prisma.$queryRaw`
        INSERT INTO users(email, password) VALUES (${email}, ${encryptedPW});
    `
}

module.exports = { getUserByEmail, createUser }
