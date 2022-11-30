const { User } = require('../models/users');
const { verify } = require('../util/authutil');

const verifyA = (req, res, next) => {
    try {

        const token = req.headers.authorization
        // console.log('req.headers.authorization: ', req.headers.authorization);
        // const token = req.headers.authorization.split('Bearer ')[1]
        // console.log('token: ', token);

        // if (token == null) return res.sendStatus(401) // 401 Unauthorized 오류는 유효한 사용자 ID 및 암호로 처음 로그인 할 때까지 액세스하려는 페이지를로드 할 수 없음을 의미
        //로긘한 회원만 가능하게


        // 2. 복호화함 => payload가 나와
        if (token) { //토큰이 있을 경우 토큰 복호화
            const splited = token.split(' ')[1]
            const verifyToken = verify(splited)
            // console.log(verifyToken)
            // req가 서로 공유됨 다른 함수에서 똑같이 req를 쓰니까 여기서 넣은 req data를 쓸 수 있다. 
            req.user = verifyToken
        }

        // 3. req에 복호화한 데이터를 넣어줌
        // User.findOne(verifyToken, (err, user) => {
        //     // console.log('user: ', user);
        //     if (err) throw err
        //     if (!user) res.json({ isAuth: false, error: true })


        //     console.log('user: ', user);

        //     // console.log('verifyToken: ', verifyToken);
        //     // 4. user정보를 response해줌
        //     // res.status(200).json({
        //     //     _id: req.user.id,
        //     //     name: req.user.name,
        //     //     email: req.user.email,
        //     //     password: req.user.password,
        //     //     role: req.user.role,
        //     // })
        // })
        next()
    } catch (error) {
        console.log('error :::::::::::::::: ', error);
        res.status(403).send({ systemMessage: "VERIFY_FAIL" })
    }

}

module.exports = { verifyA };