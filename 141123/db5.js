var db=require('db');
var Event=require('events').EventEmitter;

var user='henry4';
var pass='987654';

var ev=new Event();

db.query("SELECT * FROM user_table WHERE username='"+user+"'", function (data){
	if(data.length>0)
		console.log('重复了');
	else
		ev.emit('data');
});

ev.once('data', function (){
	db.query("INSERT INTO user_table VALUES(5, '"+user+"', '"+pass+"')", function (){
		console.log('成功');
	});
});
