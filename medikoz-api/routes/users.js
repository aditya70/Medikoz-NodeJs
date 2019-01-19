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

router.get('/', function (req, res, next) {
  con.query('SELECT * from users', function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
      //If there is no error, all is good and response is 200OK.
    }
  });
});


router.post('/', function (req, res, next) {
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
  con.query("select phone,email from users where phone=? or email=?", [phone, email], function (err1, results1, fields1) {
    if (err1) {
      res.send(JSON.stringify({ "status": 500, "error": err1, "response": null }));
      //If there is error, we send the error in the error section with 500 status
    }
    else {
      console.log(results1);
      if (results1 && results1[0] && results1[0].phone === phone) {
        res.send(JSON.stringify({ "status": 500, "error": err1, "response": "Duplicate Phone No Not Allowed" }));
      }
      else if (results1 && results1[0] && results1[0].email === email) {
        res.send(JSON.stringify({ "status": 500, "error": err1, "response": "Duplicate Email Not Allowed" }));
      }
      else {
        con.query("insert into users(user_type_id,name,country,state,city,zip_code,phone,email,address,password,alt_phone) values(?,?,?,?,?,?,?,?,?,?,?)", [user_type_id, name, country, state, city, zip_code, phone, email, address, password, alt_phone], function (error, results, fields) {
          if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
          } else {
            // res.send(JSON.stringify({"status": 200, "error": null, "response": "successfully inserted"}));
            //If there is no error, all is good and response is 200OK.
            console.log(results.insertId);
            con.query("insert into user_bank_details(user_id,bank_name,bank_ac,bank_ifsc,ac_holder_name) values(?,?,?,?,?)", [results.insertId, bank_name, bank_ac, bank_ifsc, ac_holder_name], function (err, result, field) {
              if (err) {
                res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                //If there is error, we send the error in the error section with 500 status
              } else {
                res.send(JSON.stringify({ "status": 200, "error": null, "response": "successfully Registered" }));
                //If there is no error, all is good and response is 200OK
              }
            });
          }
        });
      }
    }
  });

});

module.exports = router;
