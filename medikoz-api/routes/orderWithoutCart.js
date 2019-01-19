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


router.post('/', parseUrlencoded, function (req, res, next) {

    var user_id = req.body.userdetails.user_id;
    var user_name = req.body.userdetails.user_name;
    var country = req.body.userdetails.country;
    var state = req.body.userdetails.state;
    var city = req.body.userdetails.city;
    var zip_code = req.body.userdetails.zip_code;
    var phone = req.body.userdetails.phone;
    var email = req.body.userdetails.email;
    var ship_address = req.body.userdetails.ship_address;

    con.query("insert into orders(user_id,user_name,country,state,city,zip_code,phone,email,ship_address) values(?,?,?,?,?,?,?,?,?)", [user_id,user_name, country, state, city, zip_code, phone, email, ship_address], function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {

            console.log(results.insertId);
            // console.log(req.body.orderdetails);

            var arr = req.body.orderdetails, orders = [];
            //console.log(arr);
            for (var i = 0, len = arr.length; i < len; i++) {
                orders.push([results.insertId, arr[i].product_id, arr[i].product_name, arr[i].price, arr[i].quantity, arr[i].size, arr[i].colour]);
                // console.log(orders);
            }
            // console.log(orders);

            // res.send(JSON.stringify({ "status": 200, "error": null, "response": " Orders Details successfully inserted" }));
            con.query("insert into order_details(order_id,product_id,product_name,price,quantity,size,colour) values ?", [orders], function (err, result, field) {
                if (err) {
                    res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    
                    res.send(JSON.stringify({ "status": 200, "error": null, "response": "Your Order has been Placed successfully with Order ID: "+results.insertId }));
                   
                }
            });
        }
    });


});
module.exports = router;
