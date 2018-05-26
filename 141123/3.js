var http=require('http');
var fs=require('fs');
var dataLib=require('data');
var sessLib=require('session');

http.createServer(function (req, res){
	dataLib.parseReq(req, function (data){
		var get=data.get;
		var post=data.post;
		var cookie=data.cookie;
		var url=data.url;
		
		sessLib.read(cookie, function (session){
			dataLib.writeCookie(cookie, res);
			sessLib.write(cookie, session);	//?
			
			fs.readFile('./141123/www'+url, function (err, data){
				if(err)
					res.end('404');
				else
					res.end(data);
			});
		});
	});
}).listen(8080);

//清除session
sessLib.autoRemove(60, 20*60);
