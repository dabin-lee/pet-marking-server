
const jwt = require("jsonwebtoken");
const router = require("../routes");


router.get('/verifytoken', function (req, res, next) {

    // 인증관련 처리

    // 1.클라이언트에서 토큰을 가져온다. 
    const token = req.headers.authorization
    console.log('token: ', token);
    try {
        // 2. 토큰을 verify해서 payload가 다시 나올 수 있도록
        const decodeToken = jwt.verify(token, 'secretKey')
        console.log('decodeToken: ', decodeToken);
        res.json(res => console.log('코드 복호화'))
    } catch {
        console.log('인증에러')
    }

    // express에선 req가 서로 공유가 된다. 
    // 그 다음에 실행되는 middleware에서도 req.userInfo가 공유될 수 있다.
    // 해당 req로 만든 Api에서 사용한다. 
    next()
})


module.exports = router;