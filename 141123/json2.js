var fs=require('fs');

fs.readFile('./141123/a.txt', function (err, data){
	if(err)
		console.log('错误');
	else
	{
		var json=JSON.parse(data);
		
		console.log(json.a);
	}
});
