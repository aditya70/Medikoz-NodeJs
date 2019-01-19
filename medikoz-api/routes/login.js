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
    //res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Engaged-Auth-Token,Authorization,Content-Length, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // Pass to next layer of middleware
    next();
});
router.post('/', function (req, res, next) {
    var phone = req.body.phone;
  var password = req.body.password;
  console.log(req.body);
  //var obj=JSON.parse(req.body);
  //console.log(JSON.parse(req.body));
  console.log(phone);
  console.log(password);

 // con.query('SELECT * from users where phone=? and password=?',[phone,password] ,function (error, results, fields) {
    con.query('SELECT users.`user_id`,  users.`user_type_id`, users. `name`,  users.`country`,  users.`state`, users. `city`,  users.`zip_code`,  users.`phone`, users. `email`, users. `registration_date`, users. `address`,  users.`password`,  users.`alt_phone`,  users.`is_active`,ubd.`bank_name`, ubd.`bank_ac`, ubd.`bank_ifsc`, ubd.`ac_holder_name` FROM `users` inner join user_bank_details as ubd on users.user_id=ubd.user_id WHERE users.phone=? and users.password=? ',[phone,password] ,function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
        if(results && results[0] && results[0].user_id>0)
        {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        }
        else{
            res.send(JSON.stringify({ "status": 500, "error": "User is not authorized", "response": null })); 
        }
     
      //If there is no error, all is good and response is 200OK.
    }
  });
});
module.exports = router;