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
  var user_id = req.body.user_id;
  var user_type_id = req.body.user_type_id;
  var name = req.body.name;
  var country = req.body.country;
  var state = req.body.state;
  var city = req.body.city;
  var zip_code = req.body.zip_code;
  var phone = req.body.phone;
  var email = req.body.email;
  var address = req.body.address;
  var password = req.body.password;
  var alt_phone = req.body.alt_phone;
  var bank_name = req.body.bank_name;
  var bank_ac = req.body.bank_ac;
  var bank_ifsc = req.body.bank_ifsc;
  var ac_holder_name = req.body.ac_holder_name;
  //console.log(name);
  con.query("update users set name=?,country=?,state=?,city=?,zip_code=?,phone=?,email=?,address=?,alt_phone=? where user_id=?", [name, country, state, city, zip_code, phone, email, address, alt_phone, user_id], function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
     
    } else {
      // res.send(JSON.stringify({"status": 200, "error": null, "response": "successfully inserted"}));
     
      con.query("update user_bank_details set bank_name=?,bank_ac=?,bank_ifsc=?,ac_holder_name=? where user_id=?", [bank_name, bank_ac, bank_ifsc, ac_holder_name,user_id], function (err, result, field) {
        if (err) {
          res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));
         
        } else {
          //res.send(JSON.stringify({ "status": 200, "error": null, "response": "successfully updated" }));
          con.query("SELECT u.`user_id`, u.`user_type_id`,u. `name`, u.`country`, u.`state`,u. `city`, u.`zip_code`, u.`phone`,u. `email`, u.`registration_date`, u.`address`,u. `password`, u.`alt_phone`,ubd.`bank_name`, ubd.`bank_ac`, ubd.`bank_ifsc`,ubd. `ac_holder_name` FROM `users` as u inner join user_bank_details as ubd on u.user_id=ubd.user_id WHERE u.user_id=?", [user_id], function (error1, results1, fields1) {
            if (error1) {
              res.send(JSON.stringify({ "status": 500, "error": error1, "response": null }));
             
            } else {
              res.send(JSON.stringify({ "status": 200, "error": null, "response":results1 }));
             
            }
          });
        }
      });
    }
  });
});
module.exports = router;
