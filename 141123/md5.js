var crypto=require('crypto');

//crypto——加密：md5、sha

//1.创建
var obj=crypto.createHash('md5');

//2.数据进去
obj.update('123');
obj.update('456');

//3.输出结果
console.log(obj.digest('hex'));
