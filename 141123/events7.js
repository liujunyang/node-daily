var Event=require('events').EventEmitter;

var ev=new Event();

ev.on('data', function (){});
ev.on('data', function (){});

var obj=ev.listeners('data');

console.log(obj);
