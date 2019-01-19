var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
/* GET users listing. */

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adityagoyal252999@gmail.com',
        pass: '@@@@@1234'
    }
});


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow


    // Pass to next layer of middleware
    next();
});

/*
router.get('/:phone', function (req, res, next) {
    var phone = req.params.phone;
    console.log(phone);
    con.query('SELECT 	phone,email,password from users where phone=?', [phone], function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        }
         else {
           //  console.log(results);
             if(results.length===0)
             res.send(JSON.stringify({ "status": 500, "error": null, "response":"Users does not Exists"}));
           
             if(results && results[0] && results[0].email==="" )
             {
                res.send(JSON.stringify({ "status": 500, "error": null, "response":"your email address is not Registered "}));
                
             }
            if (results && results[0] && results[0].email && results[0].password) {


                console.log(results[0].password);
                var mailOptions = {
                    from: 'adityagoyal252999@gmail.com',
                    to: results[0].email,
                    subject: ' Password Verification',
                    text: 'your password for Medikoz application is  ' + results[0].password 
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        res.send(JSON.stringify({ "status": 500, "error": err, "response": "Some error occured" }));
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send(JSON.stringify({ "status": 200, "error": null, "response": info.response }));
                    }

                });
                res.send(JSON.stringify({ "status": 200, "error": null, "response":"Password Sent to  Email address "+results[0].email+" Please check your email address"}));
                //If there is no error, all is good and response is 200OK.
            }
          
          //   console.log(results[0].email);
         //   console.log(results[0].phone);

        }
    });
}); */
router.get('/:email', function (req, res, next) {
    var email = req.params.email;
    console.log(email);
    con.query('SELECT 	phone,email,password from users where email=?', [email], function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        }
         else {
           //  console.log(results);
             if(results.length===0)
             res.send(JSON.stringify({ "status": 500, "error": null, "response":"User does not Exists"}));
           
             if(results && results[0] && results[0].email==="" )
             {
                res.send(JSON.stringify({ "status": 500, "error": null, "response":"your email address is not Registered "}));
                
             }
            if (results && results[0] && results[0].email && results[0].password) {


                console.log(results[0].password);
                var mailOptions = {
                    from: 'adityagoyal252999@gmail.com',
                    to: results[0].email,
                    subject: ' Password Verification',
                    text: 'Your password for Medikoz application is  ' + results[0].password 
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        res.send(JSON.stringify({ "status": 500, "error": err, "response": "Some error occured" }));
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send(JSON.stringify({ "status": 200, "error": null, "response": info.response }));
                      // res.send(JSON.stringify({ "status": 200, "error": null, "response":"Your password is sent to  your registered Email address "+results[0].email+" Please check your email."}));
                    }

                });
               res.send(JSON.stringify({ "status": 200, "error": null, "response":"Your password is sent to  your registered Email address "+results[0].email+" Please check your email."}));
                //If there is no error, all is good and response is 200OK.
            }
          
          //   console.log(results[0].email);
         //   console.log(results[0].phone);

        }
    });
}); 
module.exports = router;