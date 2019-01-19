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
    //console.log(req.body.details);
    //console.log(req.body.length);
    console.log(req.body);
    var arr = req.body.details;
     console.log(arr);
    // console.log(arr.length);
    var carts = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        carts.push([arr[i].user_id, arr[i].user_name, arr[i].product_id, arr[i].product_name, arr[i].price, arr[i].quantity, arr[i].size, arr[i].colour]);
        // console.log(carts);
    }
    // console.log(carts);
    con.query("insert into carts(user_id,user_name,product_id,product_name,price,quantity,size,colour) values ?", [carts], function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            //res.send(JSON.stringify({ "status": 200, "error": null, "response": "Product has been successfully added to Your cart: " }));
            con.query("select * from carts where user_id=? ", [arr[0].user_id], function (err, result, field) {
                if (err) {
                    res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));


                }
            });

        }
    });

});
module.exports = router;
