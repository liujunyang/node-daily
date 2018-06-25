var express=require('express');

var server=express();
server.listen(8080);

//处理请求
server.get('/a.html', function (req, res){
	res.send('aaa');
});
server.post('/a.html', function (req, res){
	res.send('bbb');
});
