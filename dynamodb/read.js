var aws=require('aws-sdk');
aws.config.loadFromPath('credentials.json');
// aws.config.update('credentials.json');
var dynamodb= new aws.DynamoDB.DocumentClient();

var getfromDB=function(){
    var params= {
        TableName:"users",
        Item:{
            "email":"saurav.manchanda2009@gmail.com",
            "age":"22"
        }
    }
    // dynamodb.get(params,function(err,data){
    //     if(err){
    //         console.log("sorry");
    //         console.log(err);
    //     }
    //     else{
    //     console.log("hello from other side "+JSON.stringify(data));
    // }
    // })
    dynamodb.put(params,function(err,data){
        if(err){
            console.log("sorry");
            console.log(err);
        }
        else{
        console.log("hello from other side "+JSON.stringify(data));
    }
    })
};
getfromDB();