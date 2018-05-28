var fs=require('fs');

//要找的——切
var s='------WebKitFormBoundary8bv8EoqAW3HoViZM';
var bound=new Buffer(s);

var rn=new Buffer('\r\n');

function findInBuffer(b1, b2, start)
{
	for(var i=start;i<b1.length-(b2.length-1);i++)
	{
		var found=true;
		
		for(var j=0;j<b2.length;j++)
		{
			if(b1[i+j]!=b2[j])
			{
				found=false;
				break;
			}
		}
		
		if(found)
		{
			return i;
		}
	}
	
	return -1;
}

fs.readFile('./141130/node/buffer/a.txt', function (err, data){
	//找出所有Boundary
	var last=0;
	var pos=[];
	
	while(1)
	{
		var n=findInBuffer(data, bound, last);
		
		if(n==-1)
			break;
		
		pos.push(n);
		
		last=n+bound.length;
	}
	
	//console.log(pos);
	var arrBuffer=[];
	
	for(var i=0;i<pos.length;i++)
	{
		var d=data.slice(pos[i]+bound.length, pos[i+1]);
		arrBuffer.push(d);
	}
	arrBuffer.pop();
	
	//再切
	var files={};
	(function (){
		for(var i=0;i<arrBuffer.length;i++)
		{
			var d=arrBuffer[i];
			
			d=d.slice(2, d.length-2);
			
			//先找RN		文件信息第一行
			var n=findInBuffer(d, rn, 0);
			//0->n
			var a=d.slice(0, n);		//a=>第一行
			
			//再找RN		文件信息第二行
			var n2=findInBuffer(d, rn, n+2);
			//n+2->n2
			var b=d.slice(n+2, n2);		//b=>第二行
			
			//再找RN		空行
			var n3=findInBuffer(d, rn, n2+2);
			
			//剩下的		文件内容
			var c=d.slice(n3+2);
			
			console.log(c.toString('utf8'));
			console.log('--------------------');
		}
	})();
});
