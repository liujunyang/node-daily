var mysql=require('mysql');

var db=mysql.createConnection({host: 'localhost', user: 'root', password: '123456', database: '141123'});

db.query("SELECT COUNT(*) AS c FROM user_table", function (err, data){
	console.log(data[0].c);
});
