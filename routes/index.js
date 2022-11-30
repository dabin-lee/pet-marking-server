var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/good', function (req, res, next) {
  // console.log('헤더 setInterceptor:', req.headers.authorization)
  res.json({ dog: 'mango', cat: 'dandi' })
});

module.exports = router;



// json: 서버에서 json응답을 하고싶을 때
// render: html응답을 하고 싶을 때 
// res.send(컨텐츠 타입......)
