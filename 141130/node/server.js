var http=require('http');
var fs=require('fs');

http.createServer(function (req, res){
	var str='';		//?
	req.on('data', function (data){
		str+=data;
	});
	req.on('end', function (){
		console.log(str);
	});
	
	fs.readFile('./141130/node/www'+req.url, function (err, data){
		if(err)	//?
		{
			res.writeHeader(404, {});
			res.end('404');
		}
		else
		{
			res.writeHeader(200, {xxx: 12});
			res.end(data);
		}
	});
}).listen(8080);
