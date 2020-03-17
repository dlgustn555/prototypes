const jwtSecret = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
 
function generateToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwtSecret, {
            expiresIn: '7d'
        }, (error, token) => {
            if (error) {
                reject(error)
            }
            resolve(token)
        })
    })
}

function decodeToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if (error) {
                reject(error)
            }
            resolve(decoded)
        })
    })
}

exports.jwtMiddleware = async (ctx, next) => {
    const token = ctx.cookies.get('access_token')
    if (!token) {
        return next()
    }
}
exports.generateToken = generateToken
