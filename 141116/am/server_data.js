   

var http=require('http');
var querystring=require('querystring');
var urlLib=require('url');

http.createServer(function (req, res){
	console.log(req.addListener==req.on);
	
	//req.addListener('data', function (){console.log('data');});
	//req.addListener('end', function (){console.log('end');});
	//req.on('data', function (){console.log('data');});
}).listen(80);





