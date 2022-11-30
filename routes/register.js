var express = require('express');
var router = express.Router();
const { User } = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('유저 정보');
});

//   post
router.post('/', function (req, res, next) {
    console.log('req.body: ', req.body);
    const { email, name, pw: password } = req.body
    const user = new User({ email, name, password }) //스키마 프로퍼티랑 이름이 같아야함


    // pre 
    user.save((err, userInfo) => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.status(200).json({
            success: true
        })
    })
});

module.exports = router;