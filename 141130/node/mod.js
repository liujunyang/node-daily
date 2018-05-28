var http=require('http');


var result=0;
for(var i=0;i<http.arr.length;i++)
{
	result+=http.arr[i];
}

http.result=result;
