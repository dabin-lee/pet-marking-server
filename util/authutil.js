// 라이브러리 기능쓰기쉽게 모아둠

const jwt = require("jsonwebtoken");
const secretKey = 'marking-access-secret-key'

const getToken = (payload, isUnLimit) => {
    const expiresIn = isUnLimit ? 60 * 60 * 24 * 365 * 100 : 60 * 60 * 24
    const token = jwt.sign(payload, secretKey, { expiresIn })
    // console.log('token: ', token);
    return token
}

const verify = (token) => {
    // console.log('token:!!!!! ', token);
    try {
        const decoded = jwt.verify(token, secretKey)
        return decoded
    } catch (error) {
        // console.log('error:!!!!!!!! ', error);
        throw new Error('VERIFY_FAIL')
    }
}

module.exports = { getToken, verify }