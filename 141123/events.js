/*
var events=require('events');
var ev=new events.EventEmitter();
*/

var Event=require('events').EventEmitter;

var ev=new Event();

//ev.on
//ev.addListener

//接收
ev.on('abc', function (a, b, c, d){
	console.log(arguments);
});

//发送
ev.emit('abc', 12, 5, 6, 7);
