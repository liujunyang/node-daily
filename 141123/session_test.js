var crypto=require('crypto');

function md5(str)
{
	var obj=crypto.createHash('md5');
	
	obj.update(str);
	
	return obj.digest('hex');
}

function createSessID()
{
	var str=new Date().getTime()+''+Math.random();
	
	str=str.replace('.', '');
	
	return md5(md5(str));
}

console.log(createSessID());
