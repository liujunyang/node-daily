var Event=require('events').EventEmitter;

var ev=new Event();

//添加监听
ev.on('abc', function (){
	console.log('发生事件了');
});

//发送
var res=ev.emit('abc');

console.log(res);
