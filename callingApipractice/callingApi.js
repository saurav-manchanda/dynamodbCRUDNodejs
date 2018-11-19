// var http= require('http');
var express=require("express");
// var fs=require('fs');
var app = express();
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


app.post('/login', function(req, res){
   console.log(req.body);
   res.send(req.body.username);
});
app.listen(3000);