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
			//session
			if(!session['count'])
			{
				session['count']=1;
			}
			else
			{
				session['count']++;
			}
			
			console.log(session['count']);
			
			//cookie发送给浏览器
			var arr=[];
			for(var i in cookie)
			{
				arr.push(i+'='+cookie[i]);
			}
			res.setHeader('set-cookie', arr);
			
			console.log(cookie['sessid']);
			
			//session写回去
			sessLib.write(cookie, session);	//?
			
			//读文件
			fs.readFile('www'+url, function (err, data){
				if(err)
					res.end('404');
				else
					res.end(data);
			});
		});
		
		
		
	});
}).listen(8080);
