var fs=require('fs');

//readdir(名字, fn)
fs.readdir('./141123/session/', function (err, files){
	if(err)
	{
		console.log('读取失败');
	}
	else
	{
		console.log('读取成功');
		console.log(files);
	}
});
