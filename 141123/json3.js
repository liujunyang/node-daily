var fs=require('fs');

fs.readFile('./141123/a.txt', function (err, data){
	if(err)
		console.log('错误');
	else
	{
		try
		{
			var json=JSON.parse(data);
			console.log(json.a);
		}
		catch(e)
		{
			console.log('解析失败');
		}
	}
});
