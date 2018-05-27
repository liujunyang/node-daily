var mysql=require('mysql');
var Event=require('events').EventEmitter;

var user='henry';
var pass='123456';

//-----------不用events-----------
var db=mysql.createConnection({host: 'localhost', user: 'root', password: '123456', database: 'test'});

var ev=new Event();

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
    console.log(99999999999, data)
	if(data.length==0)
	{
		query("INSERT INTO user_table VALUES(0, '"+user+"', '"+pass+"')", function (data){
			console.log('完成');
		});
	}
	else
	{
		console.log('用户名已存在');
	}
});

/*
db.query("SELECT * FROM user_table WHERE username='"+user+"'", function (err, data){
	if(err)
		ev.emit('error', err);
	else
	{
		if(data.length==0)
		{
			db.query("INSERT INTO user_table VALUES(0, '"+user+"', '"+pass+"', '')", function (err, data){
				if(err)
					ev.emit('error', err);
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
});*/
