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
router.get('/:user_id', function (req, res, next) {
    var user_id=req.params.user_id;
    con.query('SELECT od.order_id,od.product_id,od.product_name,od.price,od.quantity,od.size,od.colour,od.order_date,od.order_status FROM order_details as od INNER JOIN orders as o on o.order_id=od.order_id where o.user_id=?', [user_id],function (error, results, fields) {
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