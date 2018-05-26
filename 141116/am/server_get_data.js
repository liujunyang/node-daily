var http=require('http');
var fs=require('fs');

http.createServer(function (req, res){
	console.log(req.url);
	
	/*
	res.write('asdfasd');
	res.end();
	*/
	
	res.end('aaaa');
}).listen(8080);
