var fs=require('fs');

var json={a: 12, b: 5};

fs.writeFile('./141123/a.txt', JSON.stringify(json), function (err){
	if(err)
		console.log('写入失败');
	else
		console.log('写入成功');
});
