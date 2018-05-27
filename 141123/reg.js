var str='我叫{name},我今年{age}';
var data={name: 'henry', age: '18'};
//我叫henry,我今年18

str=str.replace(/\{\w+\}/g, function (x){
	x=x.substring(1, x.length-1);
	
	return data[x];
});

console.log(str);
