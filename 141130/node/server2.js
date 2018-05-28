var http=require('http');
var fs=require('fs');
// var Buffer=require('buffer').Buffer;

http.createServer(function (req, res){
	var arr=[];
	req.on('data', function (data){
		arr.push(data);
	});
	req.on('end', function (){
		var str=Buffer.concat(arr).toString('utf8');
		
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
