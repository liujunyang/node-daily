   

var http=require('http');
var querystring=require('querystring');

http.createServer(function (req, res){
	res.writeHeader(200, {a: 12});
	res.setHeader('b', '5');
	
	res.write('aaa');
	
	res.end();
}).listen(80);






