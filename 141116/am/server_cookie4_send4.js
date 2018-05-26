   

var http=require('http');
var querystring=require('querystring');

http.createServer(function (req, res){
	res.write('aaa');
	
	res.setHeader('b', '5');
	
	res.end();
}).listen(80);






