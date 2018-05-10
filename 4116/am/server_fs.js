   

var http=require('http');
var fs=require('fs');

var server=http.createServer(function (request, response){
	//url	->	'/1.html'		'www/1.html'
	fs.readFile('www'+request.url, function (err, data){
		if(err)
			response.write('错误');
		else
			response.write(data);
		
		response.end();
	});
});

server.listen(80);










