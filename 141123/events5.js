var Event=require('events').EventEmitter;

var ev=new Event();

//添加监听
ev.once('abc', function (){
	console.log('发生事件了');
});

//发送
ev.emit('abc');
ev.emit('abc');
ev.emit('abc');
