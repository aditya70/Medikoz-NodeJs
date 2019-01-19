var express = require('express');
var router = express.Router();
var app = express();
/* GET users listing. */
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: true });
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Content-type','application/x-www-form-urlencoded');
   // res.setHeader('Content-type','application/json');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Engaged-Auth-Token,Authorization,Content-Length, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    // Request headers you wish to allow
  

    // Pass to next layer of middleware
    next();
});
router.post('/', function (req, res, next) {
    var phone = req.body.phone;
  var password = req.body.password;
  console.log(phone);
  console.log(password);
  con.query('SELECT * from users where phone=? and password=?',[phone,password] ,function (error, results, fields) {
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