var http=require('http');
var urlLib=require('url');
var querystring=require('querystring');
var fs=require('fs');
var crypto=require('crypto');

function md5(str)
{
	var obj=crypto.createHash('md5');
	
	obj.update(str);
	
	return obj.digest('hex');
}

function createSessID()
{
	var str=new Date().getTime()+''+Math.random();
	
	str=str.replace('.', '');
	
	return md5(md5(str));
}

http.createServer(function (req, res){	
	var str='';	//?
	req.on('data', function (data){
		str+=data;
	});
	req.on('end', function (){
		//解析get
		var obj=urlLib.parse(req.url, true);
		
		var url=obj.pathname;
		var get=obj.query;
		
		//解析post
		var post=querystring.parse(str);
		
		//解析cookie
		var cookie={};
		if(req.headers['cookie'])
		{
			cookie=querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
		}
		
		//session
		if(!cookie['sessid'])
		{
			//生成、发给浏览器
			//1.生成——别重复、尽量复杂
			cookie['sessid']=createSessID();
		}
		
		//session——存在文件里
		var session={};
		//读文件
		fs.readFile('./141123/session/'+cookie['sessid'], function (err, data){
			if(!err)
			{
				try
				{
					session=JSON.parse(data);
				}
				catch(e)
				{
					console.log('session损坏');
					session={};
				}
			}
			
			if(!session['count'])
			{
				session['count']=1;
			}
			else
			{
				session['count']++;
			}
			console.log(99, session)
			fs.writeFile('./141123/session/'+cookie['sessid'], JSON.stringify(session), function (err){
				if(err)
					console.log('写入session失败');
			});
			
			console.log(session['count']);
			
			//cookie发送给浏览器
			var arr=[];
			for(var i in cookie)
			{
				arr.push(i+'='+cookie[i]);
			}
			res.setHeader('set-cookie', arr);
			
			console.log(cookie['sessid']);
			
			//读文件
			fs.readFile('./141123/www'+url, function (err, data){
				if(err)
					res.end('404');
				else
					res.end(data);
			});
		});
	});
}).listen(8080);
