var fs= require('fs');
var http= require('http');
var path= require('path');
http.createServer(function(req,resp){

    if(req.url=="/"){
        fs.readFile('index.html',function(err,html){
            resp.writeHead(200,{'content-type': 'text/html'});
            resp.end(html);    
        });
    }
    else if(req.url=="/index.css"){
        var cssPath=path.join(__dirname,req.url);
        var fileStream=fs.createReadStream(cssPath,'UTF-8');
        resp.writeHead(200,{'content-type': 'text/css'});
        fileStream.pipe(resp);
    }
    else if(req.url.match("\.jpeg$")){
        var imgPath=path.join(__dirname,req.url);
        var fileStream=fs.createReadStream(imgPath);
        resp.writeHead(200,{'content-type':'image/jpeg'});
        fileStream.pipe(resp);
    }

}).listen(3000);


