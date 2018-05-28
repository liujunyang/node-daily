var http=require('http');
var fs=require('fs');
var data=require('data');
var common=require('common');
var db=require('database');

http.createServer(function (req, res){
	data.parse(req, function (url, get, post, files, cookie, session){
		if(!session['count'])
		{
			session['count']=1;
		}
		else
		{
			session['count']++;
		}
		
		console.log(session);
		
		//读取用户请求的文件
		fs.readFile('./141130/node/www'+url, function (err, data){
			//cookie发回去
			var arr=[];
			
			for(var i in cookie)
			{
				arr.push(i+'='+cookie[i]);
			}
			
			res.setHeader('set-cookie', arr);
			
			//发送结果
			if(err)
				res.end('404');
			else
				res.end(data);
			
			//全完事——session写回去
			fs.writeFileSync('./141130/node/_session/'+cookie['sessid'], JSON.stringify(session));
		});
	});
}).listen(8080);
