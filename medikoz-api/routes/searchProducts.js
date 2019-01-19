var express = require('express');
var router = express.Router();
var app = express();
var mysql = require("mysql");
/* GET users listing. */
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow


  // Pass to next layer of middleware
  next();
});

router.get('/:product_name', function (req, res, next) {
  var product_name = req.params.product_name;
  //console.log(product_name);
  //var sql="SELECT * from products where name like "+ "%"+ mysql.escape(product_name)+ "%";
  //console.log(sql);
  con.query('select * from products where name like ?', ['%' + product_name + '%'], function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
      //If there is error, we send the error in the error section with 500 status
    }
    else {
      res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    }

    //If there is no error, all is good and response is 200OK.
  });
});
module.exports = router;