var Event=require('events').EventEmitter;

var ev=new Event();

//添加监听
ev.on('abc', function (a, b, c, d)
{
	console.log(arguments);
});

//删除监听
ev.removeAllListeners('abc');

//发送
ev.emit('abc', 12, 5, 6, 7);
