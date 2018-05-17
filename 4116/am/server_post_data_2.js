   

var http=require('http');
var querystring=require('querystring');

http.createServer(function (req, res){
	console.log(req.url);
	
	//data		有数据到达
	//end		都到达了
	var str='';
	
	req.addListener('data', function (data){
		console.log('有数据过来了');
		str+=data;
	});
	req.addListener('end', function (){
		console.log('都过来了');
		var post=querystring.parse(str);
		
		console.log(post);
	});
	
	res.end('aaaa');
}).listen(80);







