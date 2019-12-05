const jwt = require('jsonwebtoken')

function generateToken(payload) {
    const token = jwt.sign(payload, process.env.PRIVATE_KEY)
    return token
}

function verifyToken(token) {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
    return decoded
}

module.exports = {generateToken, verifyToken}