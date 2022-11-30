var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  const { name, email, password } = req.body
  res.json({
    name,
    email,
    password
  })
  // res.send: 응답하는 형식 지정
  // res.json: json객체로만 응답
});


module.exports = router;
