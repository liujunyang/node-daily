var http=require('http');
var fs=require('fs');

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
		
		var arr2=arr[1].split('&');
		//arr2=['user=blue', 'pass=123456']
		
		var get={};
		for(var i=0;i<arr2.length;i++)
		{
			var arr3=arr2[i].split('=');
			//arr3=['user', 'blue']
			
			//arr3[0]	名字
			//arr3[1]	值
			get[arr3[0]]=arr3[1];
		}
	}
	
	console.log('解析后的=========');
	console.log(url, get);
	
	res.end('aaaa');
}).listen(8080);
