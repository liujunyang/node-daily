var http=require('http');
var fs=require('fs');

var server=http.createServer(function (request, response){
	console.log(process.cwd())
	//url	->	'/1.html'		'www/1.html'
	fs.readFile('./141116/am/www'+request.url, function (err, data){
		if(err){
			response.write('错误');
		} else {
			response.write(data);
		}

		response.end();
	});
});

server.listen(8080);










