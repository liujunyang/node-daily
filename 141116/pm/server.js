var http=require('http');
var urlLib=require('url');
var querystring=require('querystring');
var fs=require('fs');

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
		
		//用户登录
		if(url=='/user_login'){
			if(get.user=='henry' && get.pass=='123456')
			{
				res.end('{err: 0}');
			}
			else
			{
				res.end('{err: 1, msg: "用户名或密码有误"}');
			}
		} else {
			fs.readFile('./141116/pm/www'+url, function (err, data){
				if(err)
				{
					res.writeHead(404, {});
					res.end('404');
				}
				else
					res.end(data);
			});
		}
	});
}).listen(8080);
