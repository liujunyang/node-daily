var http=require('http');
var fs=require('fs');
var urlLib=require('url');
var querystring=require('querystring');
var boundary=require('boundary');

http.createServer(function (req, res){
	//把所有头，变成小写
	for(var i in req.headers)
	{
		req.headers[i.toLowerCase()]=req.headers[i];
	}
	
	//get、post、cookie、session
	var arr=[];
	req.on('data', function (data){
		arr.push(data);
	});
	req.on('end', function (){
		var buffer=Buffer.concat(arr);
		
		//文件 || 普通数据
		var post={};
		var files=[];
		
		if(req.headers['content-type']=='application/x-www-form-urlencoded' || !req.headers['content-type'])
		{
			//普通数据
			post=querystring.parse(buffer.toString('utf8'));
		}
		else
		{
			var s=req.headers['content-type'].split('; ')[1];
			var bound=s.split('=')[1];
			
			//上传文件
			files=boundary.parse(bound, buffer);
			
			for(var i=0;i<files.length;i++)
			{
				//files[i].name/filename/content
				fs.writeFile('./141130/node/upload/'+files[i].filename, files[i].content, function (err){
					if(err)
						console.log('写入错误');
				});
			}
		}
		
		//GET
		var obj=urlLib.parse(req.url);
		var url=obj.pathname;
		var get=obj.query;
		
		//
		fs.readFile('./141130/node/www'+url, function (err, data){
			if(err)
				res.end('404');
			else
				res.end(data);
		})
	});
}).listen(8080);
