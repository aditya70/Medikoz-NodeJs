var express = require('express');
var router = express.Router();
var app = express();
/* GET users listing. */
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
router.get('/product_id/:product_id', function (req, res, next) {
  var product_id = req.params.product_id;

  con.query('SELECT * from product_options where product_id=?', [product_id], function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));

    }
    else {
      //  res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
      //console.log(results);
      if (results[0]) {

        con.query('SELECT  product_options.`option_group_id`,options.option_name FROM `product_options` inner join options on product_options.option_group_id=options.option_group_id  and product_options.product_id=options.product_id WHERE product_options.product_id=?', [product_id], function (error1, results1, fields1) {
          if (error1) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));

          }
          else {
           // res.send(JSON.stringify({ "status": 200, "error": null, "response": results1 }));
           var size=[],color=[];
          // console.log(results1.length);
           for(var i=0;i<results1.length;i++)
           {
             if(results1[i].option_group_id===1)
             {
               size.push(results1[i].option_name);
             }
             else
             {
              color.push(results1[i].option_name);
             }
           }
          //  console.log(size);
          //  console.log(color);
          //  res.send("calculating......");
          res.send(JSON.stringify({ "status": 200, "error": null, "size": size,"color":color }));

          }
        });

      }
      else {
        res.send(JSON.stringify({ "status": 200, "error": null, "response": "Size and Color not available for this product" }));
      }

    }

  });


});
module.exports = router;