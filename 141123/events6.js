var Event=require('events').EventEmitter;

var ev=new Event();

ev.setMaxListeners(1);

ev.once('data', function (){});
ev.emit('data');

ev.once('data', function (){});
