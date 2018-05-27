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
	db.ev.removeAllListeners('error');
	db.ev.once('error', fnDbError);
	
	dataLib.parseReq(req, function (data){
		var get=data.get;
		var post=data.post;
		var cookie=data.cookie;
		var url=data.url;
		
		sessLib.read(cookie, function (session){
			dataLib.writeCookie(cookie, res);
			data.session=session;
			
			console.log(session['login']);
			
			var oldEnd=res.end;
			
			res.end=function ()
			{
				sessLib.write(cookie, session);
				console.log(555);
				oldEnd.apply(res, arguments);
			};
			
			if(!ev.emit(url, data, res))
			{
				fs.readFile('./141123/www'+url, function (err, data){
					if(err)
						res.end('404');
					else
						res.end(data);
				});
			}
		});
	});
}).listen(8080);

//用户部分
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
		db.query("INSERT INTO user_table (username, password) VALUES('{name}', '{pass}')", {name: get.user, pass: common.md5(get.pass)}, function (data){
			res.end('{"err": 0}');
		});
	});
});
ev.on('/user_login', function (data, res){
	var session=data.session;
	var cookie=data.cookie;
	var get=data.get;
	
	db.query("SELECT * FROM user_table WHERE username='{name}'", {name: get.user}, function (data){
		if(data.length==0)
			res.end('{"err": 1, "msg": "没有这个用户"}');
		else
		{
			console.log(data[0].password+'   '+common.md5(get.pass));
			if(data[0].password==common.md5(get.pass))
			{
				session['user_id']=data[0].ID;
				res.end('{"err": 0}');
			}
			else
			{
				res.end('{"err": 1, "msg": "用户名或密码有误"}');
			}
		}
	});
});
ev.on('/user_get_login', function (data, res){
	var session=data.session;
	
	if(session['user_id'])
		res.end('{"err": 0}');
	else
		res.end('{"err": 1}');
});

//消息部分
ev.on('/msg_post', function (data, res){
	var get=data.get;
	var session=data.session;
	
	var t=Date.t();
	
	db.query("INSERT INTO msg (content, user_id, time) VALUES('{content}', {user_id}, {time})", {
		content:	get.content,
		user_id:	session.user_id,
		time:		t
	}, function (){
		res.end('{"err": 0, "t": '+t+'}');
	});
});
ev.on('/msg_get', function (){});
ev.on('/msg_page_count', function (){});
ev.on('/msg_delete', function (){});

//清除session
sessLib.autoRemove(60, 20*60);
