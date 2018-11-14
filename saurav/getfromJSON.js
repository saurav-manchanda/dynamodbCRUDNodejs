
var http=require('http');
var fs =require("fs");
 var employees = fs.readFileSync("staff.json");
//  var contents=employees.filter(function(item){
    // return item[0].name=="Saurav";
// });
console.log(contents);
 var contents = JSON.parse(employees);
 console.log(contents[0].employees[0].name);
// var contents=JSON.parse(employees);
// console.log(contents.name);

    http.createServer(function(req,resp){
        
    resp.writeHead(200,{'content-type':'application/json'});
    resp.end(contents);
    // resp.end();
}).listen(2000);