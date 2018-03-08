let http = require('http')

let server = http.createServer(function (request, response){
	//request	请求		接收-输入
	//response	响应		发送-输出
	
	switch(request.url)
	{
		case '/1.html':
			response.write('abc');
			break;
		case '/2.html':
			response.write('ddd');
			break;
	}
	response.end();
	
	//response.write()		输出
	//response.end()		结束
});

server.listen(80);