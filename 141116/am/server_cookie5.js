   

var http=require('http');
var querystring=require('querystring');

http.createServer(function (req, res){
	//获取：req.headers['cookie']
	//设置：res.setHeader('set-cookie', ['a=12', 'b=5', 'c=66'])
	
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+3);
	
	res.setHeader('set-cookie', [
		'a=12; expires='+oDate.toGMTString(),
		'b=5'
	]);
	
	res.end('aaa');
}).listen(80);






