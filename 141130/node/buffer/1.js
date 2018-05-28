var Buffer=require('buffer').Buffer;

//1.创建
//Buffer(大小)
//var b=new Buffer(1024);

//Buffer('abc')
//var b=new Buffer('abc');

//console.log(b);
//console.log(b.length);

//Buffer([])
var b=new Buffer([65, 66, 67]);

console.log(b.toString('utf8'));
