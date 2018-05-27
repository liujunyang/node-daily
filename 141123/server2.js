var http=require('http');
var fs=require('fs');
var dataLib=require('data');
var sessLib=require('session');
var Event=require('events').EventEmitter;
var db=require('db');
var common=require('common');

var ev=new Event();

http.createServer(function (req, res){
	function fnDbError(err)
	{
		console.log('数据库出错', err);
		
		res.end('{"err": 1, "msg": "数据库出错"}');
	}
	db.ev.once('error', fnDbError);
	
	dataLib.parseReq(req, function (data){
		var get=data.get;
		var post=data.post;
		var cookie=data.cookie;
		var url=data.url;
		
		sessLib.read(cookie, function (session){
			dataLib.writeCookie(cookie, res);
			sessLib.write(cookie, session);	//?
			
			data.session=session;
			
			if(!ev.emit(url, data, res))
			{
				fs.readFile('./141123/www'+url, function (err, data){
					if(err)
						res.end('404');
					else
						res.end(data);
				});
			}
			
			db.ev.removeListener('error', fnDbError);
			//db.ev.emit('error');
		});
	});
}).listen(8080);

ev.on('/user_reg', function (data, res){
	var get=data.get;
	var ev=new Event();
	
	db.query("SELECT COUNT(*) AS c FROM user_table WHERE username='{name}'", {name: get.user}, function (data){
		if(data[0].c>0)
			res.end('{"err": 1, "msg": "此用户名已存在"}');
		else
			ev.emit('ok');
	});
	
	ev.once('ok', function (){
		db.query("INSERT INTO user (username, password) VALUES('{name}', '{pass}')", {name: get.user, pass: common.md5(get.pass)}, function (data){
			res.end('{"err": 0}');
		});
	});
	
	/*db.query("SELECT ID FROM user WHERE username='"+data.get.user+"'", function (data){
		if(data.length>0)
	});*/
});
/*ev.on('/user_login', function (){});
ev.on('/msg_post', function (){});
ev.on('/msg_get', function (){});*/

//清除session
sessLib.autoRemove(60, 20*60);
