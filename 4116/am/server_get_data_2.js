   

var http=require('http');
var fs=require('fs');
var querystring=require('querystring');

http.createServer(function (req, res){
	console.log(req.url);
	
	if(req.url.indexOf('?')==-1)
	{
		//url='/aaaa'
		var url=req.url;
		var get={};
	}
	else
	{
		//	'/sdfsd?xxxxx'
		var arr=req.url.split('?');
		
		//arr[0]->地址	/a.html
		//arr[1]->数据	xxx=xx&xxx=xxx
		var url=arr[0];
		var get=querystring.parse(arr[1]);
	}
	
	console.log('解析后的=========');
	console.log(url, get);
	
	res.end('aaaa');
}).listen(80);







