var http=require('http');
var fs=require('fs');
var urlLib=require('url');
var querystring=require('querystring');

http.createServer(function (req, res){
	//get、post、cookie、session
	var arr=[];
	req.on('data', function (data){
		arr.push(data);
	});
	req.on('end', function (){
		var str=Buffer.concat(arr).toString('utf8');	//utf8-?
		
		//GET
		var obj=urlLib.parse(req.url, true);
		
		var url=obj.pathname;
		var get=obj.query;
		
		//POST
		//区分——上传文件、普通数据
		var post=querystring.parse(str);
		
		//cookie
		if(req.headers['cookie'])
			var cookie=querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
		else
			var cookie={};
		
		//console.log(url, get, post, cookie);
		console.log(str);
		
		//文件
		fs.readFile('./141130/node/www'+url, function (err, data){
			if(err)
			{
				res.writeHeader(404, {});
				res.end('404');
			}
			else
			{
				res.writeHeader(200, {});
				res.end(data);
			}
		});
	});
}).listen(8080);
