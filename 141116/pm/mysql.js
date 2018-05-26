var mysql=require('mysql');

//1.连接
//2.请求

//1.连接-createConnection(地址, 用户名, 密码, 库)
var db=mysql.createConnection({host: 'localhost', user: 'root', password: '123456', database: 'test'});

//2.请求-query(sql语句, 回调)
db.query('SELECT * FROM user_table', function (err, data){
	if(err)
		console.log(err);
	else
		console.log(data);
});
