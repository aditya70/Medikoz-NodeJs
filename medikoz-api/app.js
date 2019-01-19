var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var getProductsRouter = require('./routes/getProducts');
var searchProductsRouter = require('./routes/searchProducts');
var searchProductsCategoryRouter = require('./routes/searchProductsCategory');
var ordersRouter = require('./routes/orders');
var updateProductsRouter = require('./routes/updateProducts');
var updateUsersRouter = require('./routes/updateUsers');
var orders1Router = require('./routes/orders1');
var forgotPasswordRouter = require('./routes/forgotPassword');
var orderlistsRouter = require('./routes/orderlists');
var addToCartRouter = require('./routes/addToCart');
var removeFromCartRouter = require('./routes/removeFromCart');
var getProductsCartRouter = require('./routes/getProductsCart');
var partnersCategoryListsRouter = require('./routes/partnersCategoryLists');
var productOptionsRouter = require('./routes/productOptions');
var app = express();
var mysql = require("mysql");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Creates database connection
global.con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'medikoz'
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/products', getProductsRouter);
app.use('/search', searchProductsRouter);
app.use('/searchCategory', searchProductsCategoryRouter);
app.use('/orders', ordersRouter);
app.use('/updateProducts', updateProductsRouter);
app.use('/updateUsers', updateUsersRouter);
app.use('/orders1', orders1Router);
app.use('/forgotPassword', forgotPasswordRouter);
app.use('/orderlists', orderlistsRouter);
app.use('/addToCart', addToCartRouter);
app.use('/removeFromCart', removeFromCartRouter);
app.use('/getProductsCart', getProductsCartRouter);
app.use('/partnersCategoryLists', partnersCategoryListsRouter);
app.use('/productOptions', productOptionsRouter);
//app.use('/orderWithoutCart', orderWithoutCartRouter);
/*
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
});*/

var server = app.listen(5000, function () {
  console.log('Node server is listening on port 5000');
});


module.exports = app;
