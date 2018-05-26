http、fs
get、post、cookie
数据库

*session

-------------------------------------------------------------------------------

get>cookie>post

-------------------------------------------------------------------------------

db.query('SEL...', function (err, data){
	if(err)
		end();
	else
	{
		db.query('insert', function (err, data){
			if(err)
				end();
			else
			{
				db.query('update', function (err, data){
					if(err)
						end();
					else
					{
						write();
					}
				});
			}
		});
	}
});

-------------------------------------------------------------------------------

events

.on/.addListener	添加
.removeListener		删除-匿名删不掉
	.removeAllListeners		【不推荐】



.emit			发送
	【重要】	有返回值——返回是否有人接收事件

-------------------------------------------------------------------------------

E CONN REFUSED
E	error
CONN	connect
REFUSED	拒绝

query(xxx, ...)
query(xxx, ...)

-------------------------------------------------------------------------------

session——

sessionID=>cookie

-------------------------------------------------------------------------------

session——
1.关闭浏览器
2.超时-20min

-------------------------------------------------------------------------------

MD5-加密
保存密码

明文-
密文-加密后的

MD5——单向散列

hex-16进制
oct-8进制

-------------------------------------------------------------------------------

加密MD5：
1.创建	crypto.createHash('md5');
2.堆	obj.update('xxx');
3.输出	obj.digest('hex');

-------------------------------------------------------------------------------

set-cookie:
set-cookie:
set-cookie:

writeHeader(200, {a: 12, b: 5});	//不能重复
setHeader('a', 12);(这里的'a'和下面的'set-cookie'是同级别的）
setHeader('set-cookie', ['a=2', 'b=5']);

-------------------------------------------------------------------------------

setHeader
writeHeader	-发送头
write		-发内容
end

-------------------------------------------------------------------------------

JSON.stringify(json)	->	string
JSON.parse(string)	->	json

-------------------------------------------------------------------------------

SQL

4大语句

SELECT	查询
UPDATE	修改
INSERT	插入
DELETE	删除

SELECT * FROM 表 WHERE 条件
UPDATE 表 SET 列=值,列=值 WHERE 条件
DELETE FROM 表 WHERE 条件
INSERT INTO 表 VALUES(x,x,x,x)
	主键-给空的就行——0、null、''

UPDATE
where

-------------------------------------------------------------------------------

INSET
INSERT INTO user_table VALUES('blue555', '654321')	【不要用】
INSERT INTO user_table (username, password) VALUES('blue555', '654321')

-------------------------------------------------------------------------------

SELECT * FROM user_table;

1.函数
SELECT COUNT(*) FROM user_table;
SELECT MAX(ID) FROM user_table;

2.别名
SELECT COUNT(*) AS c FROM user_table;

3.*——列名
SELECT username,password FROM user_table;

4.排序
SELECT * FROM 表 ORDER BY math DESC/ASC
	ASC	升序(小->大)
	DESC	降序(大->小)

SELECT * FROM student ORDER BY math DESC,chinese DESC

5.条件
AND	SELECT * FROM student WHERE math>30 AND chinese>90
OR	SELECT * FROM student WHERE math>60 OR chinese>60 OR english>60

6.子查询
SELECT * FROM 表 WHERE ID IN (2,3,4)
SELECT * FROM 表 WHERE ID IN (SELECT ....)

-------------------------------------------------------------------------------

用户留言板：
1.登录用户能发
2.可以删除自己的留言（别人的不能删）

用户——注册、登录
	注册	/user_reg?user=xxx&pass=xxx
		{err: 0}/{err: 1, msg: 'xxxx'}

	登录	/user_login?user=xxx&pass=xxx
	检测登录	/user_get_login
		{err: 0}/{err: 1}

留言——发布、获取某一页、获取页数、删除
	发布	/msg_post?content=xxx
		{err: 0, time: xxx}/{err: 1}
	获取	/msg_get?page=1
	页数	/msg_page_count
	删除	/msg_delete?id=12

表：
user
	ID、username、password、token

msg
	ID、content、user_id、time

-------------------------------------------------------------------------------

obj.xxx();	xxx的this=>obj
xxx();		xxx的this=>window

-------------------------------------------------------------------------------

TRUNCATE	清空、恢复主键序号
DELETE		清空、不管

-------------------------------------------------------------------------------

readFile
readFileSync

writeFile
writeFileSync

readdir
readdirSync
