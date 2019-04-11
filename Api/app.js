require('typescript-require');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var http = require('http');


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// var funcs = require("./db_connection.ts");
// console.log(funcs.test())
// test connection
// var typeorm = require("typeorm");
// var log_category = require("./models/entities/log_category");
// console.log(log_category.log_category)
// var EntitySchema = typeorm.EntitySchema;
// typeorm.createConnection({
//   type: "mysql",
//   host: "databases.aii.avans.nl",
//   port: 3306,
//   username: "asautar",
//   password: "Ab12345",
//   database: "asautar_db",
//   entities: [
//     log_category
//   ],
//   synchronize: true,
//   logging: false
// }).then(connection => {
//   // here you can start to work with your entities
//   console.log("connection succeeded");
//   var category1 = {
//     name: "toedienmoment"
//   };
//   //var logCategoryRepository = connection.getRepository("log_category");

// }).catch(error => console.log(error));
// test connection

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Database connection
app.use(function (req, res, next) {
  global.connection = mysql.createConnection({
    host: 'databases.aii.avans.nl',
    user: 'asautar',
    password: 'Ab12345',
    database: 'asautar_db'
  });
  connection.connect();
  next();
});

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('/', index);
app.use('/api/v1/users', users);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
var server = http.createServer(app);
server.listen(4001);
