var fs=require('fs');

//unlink(文件名, fn);
fs.unlink('./141123/a.txt', function (err){
	if(err)
		console.log('错了');
	else
		console.log('删除成功');
});
