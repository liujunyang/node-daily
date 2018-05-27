var mysql=require('mysql');
var Event=require('events').EventEmitter;

var user='henry3';
var pass='123456';

//-----------不用events-----------
var db=mysql.createConnection({host: 'localhost', user: 'root', password: '123456', database: 'test'});

var ev=new Event();

//处理错误
ev.on('error', function (err){
	console.log('数据库出错', err);
});

function query(sql, fn)
{
	db.query(sql, function (err, data){
		if(err)
			ev.emit('error', err);
		else
			fn(data);
	});
}

query("SELECT * FROM user_table WHERE username='"+user+"'", function (data){
	if(data.length==0)
	{
		ev.emit('data');
	}
	else
	{
		console.log('用户名已存在');
	}
});

ev.once('data', function (){
	query("INSERT INTO user_table VALUES(3, '"+user+"', '"+pass+"')", function (data){
		console.log('完成');
	});
});
