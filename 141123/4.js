var http=require('http');

http.createServer(function (req, res){
	res.write({a: 12, b: 5});
	res.end();
}).listen(8080);