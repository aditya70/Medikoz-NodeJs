var express = require('express');
var router = express.Router();
var app = express();
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
router.get('/', function (req, res, next) {
  con.query('SELECT * from products where 1',function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
      //If there is error, we send the error in the error section with 500 status
    } 
        else{
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        }
     
      //If there is no error, all is good and response is 200OK.
  });
});

router.get('/:category_id', function (req, res, next) {
  var category_id=req.params.category_id;
  con.query('SELECT * from products where category_id=?',[category_id],function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
      //If there is error, we send the error in the error section with 500 status
    } 
        else{
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        }
     
      //If there is no error, all is good and response is 200OK.
  });
});
router.get('/user_type_id/:user_type_id', function (req, res, next) {
  var user_type_id=req.params.user_type_id;
  con.query('SELECT p.`product_id`, p.`name`, p.`price`,p. `weight`, p.`short_desc`, p.`long_desc`, p.`category_id`, p.`units_in_stock`, p.`units_on_order`, p.`discount_available` FROM `products` p inner join products_for_partners on p.product_id=products_for_partners.product_id WHERE products_for_partners.user_type_id=?',[user_type_id],function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
      //If there is error, we send the error in the error section with 500 status
    } 
        else{
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        }
     
      //If there is no error, all is good and response is 200OK.
  });
});
module.exports = router;