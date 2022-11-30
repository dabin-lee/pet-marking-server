var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/users');
const { getToken } = require('../util/authutil');
const { verify } = require('../util/authutil')

// 회원가입
router.post('/register', function (req, res, next) {
    // 응답받은 req.body를 가져옴
    const { email, pw: password, name } = req.body
    // 생성자로 user를 만듬
    const user = new User({ email, password, name })

    // 비밀번호 암호화시켜서 db에 저장
    // pre로 암호화 시킨다음에 user를 save시킴
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


// 토큰검증용
router.post('/comfirm-token', function (req, res, next) {
    // 응답받은 req.body를 가져옴
    const { token } = req.body

    try {
        const verifyToken = verify(token) //사용자 정보가 들어감
        if (!verifyToken) throw new Error('unauthorized')
        res.json({ userId: verifyToken.email, name: verifyToken.name })

    } catch (error) {
        console.log('error: ', error);
        res.status(401).send('unauthorized')

    }
})


// 로그인
router.post('/login', async function (req, res, next) {
    const { email, pw: password } = req.body

    try {
        const userInfo = await User.findOne({ email })


        // email을 비교해보기
        // 1. 해당 email이 db에 있는지
        // 2. 있다면 pw가 일치하는지
        // 3. 비번까지 같다면 token 생성
        // 4. 생성된 토큰은 cookie에 저장

        if (!userInfo) { //요청된 email을 가진 유저가 한명도 없다면
            return res.status(401).json({
                message: '가입된 회원이 아닙니다.'
            })
        }

        const match = bcrypt.compareSync(password, userInfo.password)
        //여기서의 userInfo는?  요청한 email이 user에 있는 DB

        if (match) {
            const createToken = getToken(userInfo.toJSON())
            res.json({
                userId: userInfo.email,
                loginToken: createToken,
                name: userInfo.name,
                message: `반가워요 ${userInfo.name}님`
            })
        }
    } catch (err) {
        console.log('err: ', err);
        return res.status(401).json({ //401은 error로 받음
            message: '비밀번호가 일치하지 않습니다.'
        })
    }
})



// 유저 수정

router.post('/user', (req, res) => {
    const { token } = req.body
    token = ''
    res.status(200).send('sucesse: true')
})

router.get('/user', (req, res) => {
    const { token } = req.body
    token = ''
    res.status(200).send('sucesse: true')
})

module.exports = router;