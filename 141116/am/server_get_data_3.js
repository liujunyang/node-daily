var http=require('http');
var fs=require('fs');
var urlLib=require('url');

http.createServer(function (req, res){
	console.log(req.url);
	
	var obj=urlLib.parse(req.url, true);
	
	var url=obj.pathname;
	var get=obj.query;
	
	console.log('解析后的=========');
	console.log(url, get);
	
	res.end('aaaa');
}).listen(8080);
