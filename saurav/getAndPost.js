var http=require('http');
var fs=require('fs');
var queryString=require('querystring');
var awsClient= require('aws-sdk');
var dynamodb=require('dynamodb');
dynamodb.AWS.config.loadFromPath('credentials.json');

var params = {
    TableName : "Movies",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

  
  dynamodb.createTables(params,function(err) {
    if (err) {
      console.log('Error creating tables: ', err);
    } else {
      console.log('Tables has been created');
    }
  });


var server= http.createServer(function(req,resp){
    if(req.method=="GET"){
        console.log("GEt");
        resp.writeHead(200,{"content-type":"text/html"});
        fs.createReadStream("getAndPost.html").pipe(resp);
   
    }
    else if(req.method=="POST"){
        console.log("POSt");
        var data="";
        req.on("data",function(chunk){
            data+=chunk;
            var q=queryString.parse(data);
            console.log(data);
            console.log(q);
            resp.writeHead(200,{"content-type":"text/html"});
            resp.end(data);
        });
        // req.on("end",function(){
        //     resp.writeHead(200,{"content-type":"text/html"});
        //     resp.end(data);
        // })
    }
}).listen(2500);

