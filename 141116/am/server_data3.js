   

var http=require('http');
var querystring=require('querystring');
var urlLib=require('url');

http.createServer(function (req, res){
	var str='';		//风险
	
	req.on('data', function (data){
		str+=data;
	});
	req.on('end', function (){
		//解析
		//GET
		var json=urlLib.parse(req.url, true);
		var url=json.pathname;
		var get=json.query;
		
		//POST
		var post=querystring.parse(str);
		
		//COOKIE
		var cookie={};
		if(req.headers['cookie'])
			cookie=querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
		
		console.log(url, get, post, cookie);
		
		res.end('aaa');
	});
}).listen(8080);
