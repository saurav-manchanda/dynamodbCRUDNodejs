var express= require('express');
var aws=require('aws-sdk');
aws.config.loadFromPath('credentials.json');

var dynamodb= new aws.DynamoDB.DocumentClient();
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
    
var nodemailer = require('nodemailer');



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// var router = express.Router();
// test route
app.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
app.post('/login',function(req,resp){
    var email=req.body.email;
    var password=req.body.password;
    var users={
        "email":email
        // "password":req.body.password
      }
    //   console.log(users);
      var params= {
        TableName:"user",
        Key: users
    }
    // console.log(params);
    dynamodb.get(params,function(err,data){
        // console.log(params);
        if(err){
            console.log("sorry");
            console.log(err);
            resp.send({
                "code": 404,
                "failure":"user not there"
            });
        }
            else{
                // console.log(email);
                if(data.Item.email==email && data.Item.password==password){
                    resp.send({
                        "code":200,
                        "success":"successfully logged in"
                          });
                }
                resp.send({
                    "code": 404,
                    "failure":"wrong credentials"
                });
            }
            });
});
app.post('/register',function(req,resp){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'akalgutkar24@gmail.com',
          pass: 'Kalgutkar@123'
        }
      });
      var mailOptions = {
        from: 'akalgutkar24@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("hgdshi");
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    var today = new Date();
    var users={
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "email":req.body.email,
        "password":req.body.password,
        "created":today,
        "modified":today
      }
      console.log(users);
    //   var f=function(){
        console.log("inside f");
        var params= {
            TableName:"user",
            Item: users
        }
        console.log(params);
       
          
    dynamodb.put(params,function(err,data){
        console.log(params);
        if(err){
            console.log("sorry");
            console.log(err);
            resp.send({
                "code": 404,
                "failure":"user already existing"
            });
        }
            else{
            resp.send({
                "code":200,
                "success":"user registered sucessfully"
                  });
                }
            });
});
app.post("/mail",function(req,resp){
    var transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
          user: 'dharaparanjape.1007@gmail.com',
          pass: 'dhara1007'
        }
      });
      
      var mailOptions = {
        from: 'dharaparanjape1007@gmail.com',
        to: 'saurav.manchanda2009@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})

app.listen(3000);