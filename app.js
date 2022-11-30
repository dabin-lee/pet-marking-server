require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var { verifyA } = require('./middleware/verifyAuth')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var storeRrouter = require('./routes/store')

var cors = require('cors')
// mongoose
const mongoose = require('mongoose')
var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(verifyA) //모든 통신에 실행이됨. //라우터에끼우면 그라우터만 미들웨가 실행됨

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/store', storeRrouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// # MongoDB URI
const { MONGO_DB } = process.env;
mongoose.connect(
  MONGO_DB, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(res => console.log('mongoose conneted...'))
  .catch(err => console.log(err))



var port = process.env.PORT ?? 3000
app.set('port', port);
app.listen(port)
console.log('current server port: ', port);



module.exports = app;

