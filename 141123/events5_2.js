var Event=require('events').EventEmitter;

var ev=new Event();

//添加监听
function abc()
{
	console.log('发生事件了');
	
	ev.removeListener('abc', abc);
}

ev.on('abc', abc);

//发送
ev.emit('abc');
ev.emit('abc');
ev.emit('abc');
