var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const jwt = require('jsonwebtoken');
//add passport
const passport = require('./config/passport');
//crear objeto session
const session = require('express-session')
//MONGOOSE
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/red_bicicletas';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

var indexRouter = require('./routes/index');
//usuarios
var usuariosRouter = require('./routes/usuarios');
//token
var tokenRouter = require('./routes/token');
//var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios')

//Guardar la session en memoria
const store = new session.MemoryStore;

var app = express();
app.use(session({
  cookie: { maxAge: 240 * 60 *60 * 1000 },
  store: store,
  saveUninitialized: true,
  resave: 'true',
  secret: 'red_bicis_!!!***'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//inicializar passport despues de cookieParser
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);

//usuarios
app.use('/usuarios', usuariosRouter);
//token
app.use('/token', tokenRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
