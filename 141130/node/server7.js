var http=require('http');
var fs=require('fs');
var data=require('data');
var common=require('common');
var db=require('database');

http.createServer(function (req, res){
	data.parse(req, function (url, get, post, files, cookie, session){
		//把上传的文件存到upload
		for(var i=0;i<files.length;i++)
		{
			var n=files[i].filename.lastIndexOf('.');
			var ext='';
			
			if(n!=-1)
			{
				ext=files[i].filename.substring(n);
			}
			
			//保存文件——新的、不会冲突文件名
			var newFileName=common.md5(Math.random()+''+new Date().getTime())+ext;
			
			(function (index){
				fs.writeFile('./141130/node/upload/'+newFileName, files[i].content, function (err){
					if(err)
						console.log('错了');
					else
					{
						db.query("INSERT INTO `uploads` (`filename`, `old_filename`, `post_time`) VALUES('{filename}', '{old}', {time})", {filename: newFileName, old: files[index].filename, time: Math.floor(new Date().getTime()/1000)}, function (err, data){
							if(err)
								console.log('数据库错误');
						});
					}
				});
			})(i);
			
			//写入数据库
			//fs.writeFile('upload/'+files[i].filename
		}
		
		//读取用户请求的文件
		fs.readFile('./141130/node/www'+url, function (err, data){
			if(err)
				res.end('404');
			else
				res.end(data);
		});
	});
}).listen(8080);
