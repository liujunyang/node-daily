var http=require('http');
var fs=require('fs');
var urlLib=require('url');
var querystring=require('querystring');

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
		var b=Buffer.concat(arr);
		
		var str=b.toString('utf8');
		
		console.log(str);
		
		//GET
		var obj=urlLib.parse(req.url, true);
		
		var url=obj.pathname;
		var get=obj.query;
		
		//POST
		//区分——上传文件、普通数据
		if(req.headers['content-type']=='application/x-www-form-urlencoded' || !req.headers['content-type'])
		{
			var post=querystring.parse(str);
		}
		else
		{
			//文件
			//1.boundary提取出来
			var s=req.headers['content-type'].split('; ')[1];
			var boundary=s.split('=')[1];
			
			//2.用boundary切post字符串
			boundary='--'+boundary;
			var aStr=str.split(boundary);
			
			aStr.shift();	//第一个空的		不要
			aStr.pop();		//最后一个是结束	不要
			
			for(var i=0;i<aStr.length;i++)
			{
				(function (str){
					/*
					name=>file框的name	【1行】
					filename=>文件名		【1行】
					*/
					var arr=str.split(/\r\n|\r|\n/g);	//?
					
					//第一行——name、filename
					var arr2=arr[1].split('; ');
					
					//name		?
					var s=arr2[1].split('=')[1];
					var name=s.substring(1, s.length-1);
					
					//filename	?
					var s=arr2[2].split('=')[1];
					var filename=s.substring(1, s.length-1);
					
					//文件内容	?
					var arrContent=arr.splice(4);
					var content=arrContent.join('\r\n');
					
					fs.writeFile('upload/'+filename, content, function (err){
						if(err)
							console.log('写入失败', filename);
					});
				})(aStr[i]);
			}
			
			//3.文件内容提取出来
		}
		
		//cookie
		if(req.headers['cookie'])
			var cookie=querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
		else
			var cookie={};
		
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
