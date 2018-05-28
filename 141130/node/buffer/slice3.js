var fs=require('fs');

function parseBoundary(s, data)
{
	//要找的——切
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
	var files=[];
	(function (){
		for(var i=0;i<arrBuffer.length;i++)
		{
			var d=arrBuffer[i];
			
			d=d.slice(2, d.length-2);
			
			//文件信息第一行
			var n=findInBuffer(d, rn, 0);
			var a=d.slice(0, n);
			
			var str=a.toString('utf8');
			var arr=str.split('; ');
			
			var s=arr[1].split('=')[1];
			var name=s.substring(1,s.length-1);
			
			var s=arr[2].split('=')[1];
			var filename=s.substring(1,s.length-1);
			
			//console.log(name, filename);
						
			//文件信息第二行
			var n2=findInBuffer(d, rn, n+2);
			var b=d.slice(n+2, n2);
			
			//空行
			var n3=findInBuffer(d, rn, n2+2);
			
			//文件内容
			var c=d.slice(n3+2);
			
			files.push({name: name, filename: filename, content: c});
		}
	})();
	
	return files;
}

fs.readFile('./141130/node/buffer/a.txt', function (err, data){
	var files=parseBoundary('------WebKitFormBoundary8bv8EoqAW3HoViZM', data);
	
	console.log(files);
});
