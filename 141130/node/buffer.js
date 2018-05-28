var fs=require('fs');
// var Buffer=require('buffer').Buffer;

fs.readFile('./141130/node/1.js', function (err, data){
	//Buffer.concat()
	var newData=Buffer.concat([data, data]);
	
	//console.log(data);
	
	//1.buffer->字符串
	//console.log(data);
	console.log(newData.toString('utf8'));
	//console.log(data.toString('base64'));
});
