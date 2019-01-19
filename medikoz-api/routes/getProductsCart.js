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
  var user_id = req.params.user_id;
  con.query('SELECT * from carts  where user_id=?',[user_id], function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));

    }
    else {
      res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    }

  });
});
module.exports = router;