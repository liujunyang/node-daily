var fs=require('fs');

/*
atime	access time
mtime	modify time
ctime	create time
*/

//stat(名字, fn)
fs.stat('./141123/session/26d1d5bb59062910a71e6dbc2364a4c5', function (err, stat){
	if(err)
	{
		console.log('获取文件信息失败');
	}
	else
	{
		console.log('获取成功');
		console.log(stat.mtime.constructor);
	}
});
