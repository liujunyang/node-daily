var http=require('http');
var urlLib=require('url');
var querystring=require('querystring');
var fs=require('fs');
var mysql=require('mysql');

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
			var db=mysql.createConnection({host: 'localhost', user: 'root', password: '', database: '20141116'});
			
			db.query("SELECT * FROM user_table WHERE username='"+get.user+"'", function (err, data){
				if(err)
					send(500, '{err: 1, msg: "数据错误"}');
				else
				{
					if(data.length==0)
						send(200, '{err: 1, msg: "用户名不存在"}');
					else
					{
						if(data[0].password==get.pass)
						{
							//token
							var token=new Date().getTime()+'_'+Math.random();
							
							cookie.token=token;
							
							db.query("UPDATE user_table SET token='"+token+"' WHERE username='"+get.user+"'", function (err, data){
								if(err)
									send(500, '{err: 1, msg: "服务器错误"}');
								else
									send(200, '{err: 0}');
							});
						}
						else
							send(200, '{err: 1, msg: "密码错误"}');
					}
				}
			});
		}
		else if(url=='/get_user_by_token')
		{
			console.log('获取：'+get.token);
			var db=mysql.createConnection({host: 'localhost', user: 'root', password: '', database: '20141116'});
			db.query("SELECT * FROM user_table WHERE token='"+get.token+"'", function (err, data){
				if(err)
					send(500, '{err: 1, msg: "数据库错误"}');
				else
					if(data.length==0)
						send(200, '{err: 1}');
					else
						send(200, "{err: 0, user: '"+data[0].username+"'}");
			});
		}
		else
		{
			fs.readFile('./4116/pm/www'+url, function (err, data){
				if(err)
					send(404, '404');
				else
					send(200, data);
			});
		}
	});
}).listen(8080);
