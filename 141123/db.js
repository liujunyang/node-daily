var mysql=require('mysql');
var Event=require('events').EventEmitter;

var user='henry';
var pass='123456';

//-----------不用events-----------
var db=mysql.createConnection({host: 'localhost', user: 'root', password: '123456', database: '141123'});

db.query("SELECT * FROM user_table WHERE username='"+user+"'", function (err, data){
	if(err)
		console.log('错了', err);
	else
	{
		if(data.length==0)
		{
			db.query("INSERT INTO user_table VALUES(0, '"+user+"', '"+pass+"', '')", function (err, data){
				if(err)
					console.log('错了', err);
				else
				{
					console.log('完成');
				}
			});
		}
		else
		{
			console.log('用户名已存在');
		}
	}
});
