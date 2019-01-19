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
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    //var user_id = req.params.user_id;
    //var product_id = req.params.product_id;
    //con.query('delete from carts  where user_id=? and product_id=?', [user_id, product_id], function (error, results, fields) {
    con.query('delete from carts  where id=? ', [id], function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));

        }
        else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            // con.query('SELECT * from carts where user_id=?', [user_id], function (err, result, field) {
            //     if (err) {
            //         res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));

            //     }
            //     else {
            //         res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
            //     }


            // });
        }
    });
});
router.get('/user_id/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    //var user_id = req.params.user_id;
    //var product_id = req.params.product_id;
    //con.query('delete from carts  where user_id=? and product_id=?', [user_id, product_id], function (error, results, fields) {
    con.query('delete from carts  where user_id=? ', [user_id], function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));

        }
        else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            // con.query('SELECT * from carts where user_id=?', [user_id], function (err, result, field) {
            //     if (err) {
            //         res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));

            //     }
            //     else {
            //         res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
            //     }


            // });
        }

    });
});

module.exports = router;