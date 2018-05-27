var Event=require('events').EventEmitter;

var ev=new Event();

//添加监听
function fnAbc(a, b, c, d)
{
	console.log(arguments);
}

ev.on('abc', fnAbc);

//删除监听
ev.removeListener('abc', fnAbc);

//发送
ev.emit('abc', 12, 5, 6, 7);
