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

router.get('/:category_name', function (req, res, next) {
    var category_name = req.params.category_name;
    console.log(category_name);
    con.query('select * from product_categories where category_name= ?', [category_name], function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        }
        else {
            //console.log(results[0].category_id);
            if(results && results[0] && results[0].category_id>0)
            {
             con.query('select * from products where category_id=?', [results[0].category_id], function (err, result, field) {
                if (error) {
                    res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));
                    //If there is error, we send the error in the error section with 500 status
                }
                else {
                    res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
                }

                //If there is no error, all is good and response is 200OK.
             });
           }
           else
           {
            res.send(JSON.stringify({ "status": 500, "error": "error", "response": "Product Of rquired Category not available" })); 
           }
        }

        //If there is no error, all is good and response is 200OK.
    });

});
module.exports = router;