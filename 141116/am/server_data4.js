   

var http=require('http');
var dataParse=require('dataParse');

http.createServer(function (req, res){
	dataParse.parse(req, function (url, get, post, cookie){
		console.log(url, get, post, cookie);
	});
}).listen(8080);








