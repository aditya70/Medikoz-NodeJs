var express = require('express');
var router = express.Router();
var app = express();
/* GET users listing. */

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: true });

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow


    // Pass to next layer of middleware
    next();
});


router.post('/', function (req, res, next) {
    var product_id = req.body.product_id;
    var name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var size = req.body.size;
    var colour = req.body.colour;
    var user_id = req.body.user_id;
    var country = req.body.country;
    var state = req.body.state;
    var city = req.body.city;
    var zip_code = req.body.zip_code;
    var phone = req.body.phone;
    var email = req.body.email;
    var ship_address = req.body.ship_address;

    con.query("insert into order_details(product_id,name,price,quantity,size,colour) values(?,?,?,?,?,?)", [product_id, name, price, quantity, size, colour], function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            // res.send(JSON.stringify({"status": 200, "error": null, "response": "successfully inserted"}));
            //If there is no error, all is good and response is 200OK.
            console.log(results.insertId);
            con.query("insert into orders(order_id,user_id,country,state,city,zip_code,ship_address,phone,email) values(?,?,?,?,?,?,?,?,?)", [results.insertId, user_id, country, state, city, zip_code, ship_address, phone, email], function (err, result, field) {
                if (err) {
                    res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    res.send(JSON.stringify({ "status": 200, "error": null, "response": " Orders Details successfully inserted" }));
                    //If there is no error, all is good and response is 200OK
                }
            });
        }
    });

});
module.exports = router;
