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
router.post('/', function (req, res, next) {
    var product_id=req.body.product_id;
    var name=req.body.name;
    var price=req.body.price;
    var weight=req.body.weight;
    var short_desc=req.body.short_desc;
    var long_desc=req.body.long_desc;
    var category_id=req.body.category_id;
    var units_in_stock=req.body.units_in_stock;
    var units_on_order=req.body.units_on_order;
    var discount_available=req.body.discount_available;
    var flag=0;
   // console.log(product_id);
   var sql="update products set ";
    if(name!="")
    {
        if(flag===0)
        {
            sql=sql + 'name='+"'"+name+"'";
            flag=1;
        }
      
    }

    if(price!="")
    {
        if(flag===0)
        {
            sql=sql + 'price='+"'"+price+"'";
            flag=1;
        }
        else{
            sql=sql + ',price='+"'"+price+"'";
        }
     
    }
    if(weight!="")
    {
        if(flag===0)
        {
            sql=sql + 'weight='+"'"+weight+"'";
            flag=1;
        }
        else{
            sql=sql + ',weight='+"'"+weight+"'";
        }
    }
    if(short_desc!="")
    {
        if(flag===0)
        {
            sql=sql + 'short_desc='+"'"+short_desc+"'";
            flag=1;
        }
        else{
            sql=sql + ',short_desc='+"'"+short_desc+"'";
        }
    }
    if(long_desc!="")
    {
        if(flag===0)
        {
            sql=sql + 'long_desc='+"'"+long_desc+"'";
            flag=1;
        }
        else{
            sql=sql + ',long_desc='+"'"+long_desc+"'";
        }
    }
    if(category_id!="")
    {
        if(flag===0)
        {
            sql=sql + 'category_id='+"'"+category_id+"'";
            flag=1;
        }
        else{
            sql=sql + ',category_id='+"'"+category_id+"'";
        }
    }
    if(units_in_stock!="")
    {
        if(flag===0)
        {
            sql=sql + 'units_in_stock='+"'"+units_in_stock+"'";
            flag=1;
        }
        else{
            sql=sql + ',units_in_stock='+"'"+units_in_stock+"'";
        }
    }
    if(units_on_order!="")
    {
        if(flag===0)
        {
            sql=sql + 'units_on_order='+"'"+units_on_order+"'";
            flag=1;
        }
        else{
            sql=sql + ',units_on_order='+"'"+units_on_order+"'";
        }
    }
    if(discount_available!="")
    {
        if(flag===0)
        {
            sql=sql + 'discount_available='+"'"+discount_available+"'";
            flag=1;
        }
        else{
            sql=sql + ',discount_available='+"'"+discount_available+"'";
        }
    }
    sql=sql+'where product_id='+product_id;
    console.log(sql);
  con.query(sql,function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
      //If there is error, we send the error in the error section with 500 status
    } 
        else{
            res.send(JSON.stringify({ "status": 200, "error": null, "response": "successfully updated"}));
        }
     
      //If there is no error, all is good and response is 200OK.
  });
});

module.exports = router;