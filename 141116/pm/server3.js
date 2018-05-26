var http=require('http');
var urlLib=require('url');
var querystring=require('querystring');
var fs=require('fs');

var jsonToken={};		//{'4234234': 'henry', '343465435643': 'test'}

http.createServer(function (req, res){
	var str='';
	
	req.on('data', function (data){
		str+=data;
	});
	req.on('end', function (){
		//GET
		var obj=urlLib.parse(req.url, true);
		var url=obj.pathname;
		var get=obj.query;
		
		//POST
		var post=querystring.parse(str);
		
		//COOKIE
		var cookie={};
		if(req.headers['cookie'])
			cookie=querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
		
		function send(status, data)
		{
			//准备数组
			var arr=[];
			for(var name in cookie)
			{
				arr.push(name+'='+encodeURIComponent(cookie[name]));
			}
			
			//把所有cookie，发给前台
			res.setHeader('set-cookie', arr);
			res.writeHeader(status, {});
			
			res.end(data);
		}
		
		//用户登录
		if(url=='/user_login')
		{
			if(get.user=='henry' && get.pass=='123456')
			{
				var token=Date.now()+'_'+Math.random();
				jsonToken[token]=get.user;
				cookie.token=token;
				
				send(200, '{err: 0}');
			}
			else
				send(200, '{err: 1, msg: "用户名或密码有误"}');
		}
		else if(url=='/get_user_by_token')
		{
			if(jsonToken[get.token])
				send(200, '{err: 0, user: "'+jsonToken[get.token]+'"}');
			else
				send(200, '{err: 1}');
		}
		else
		{
			fs.readFile('./141116/pm/www'+url, function (err, data){
				if(err)
					send(404, '404');
				else
					send(200, data);
			});
		}
	});
}).listen(8080);
