var str="SELECT * FROM {table} WHERE user='{name}'";
var data={table: 'user_table', name: 'henry'};

var result=str.replace(/\{\w+\}/g, function (s){
	s=s.substring(1,s.length-1);
	
	return data[s];
});

console.log(result);

//SELECT * FROM user_table WHERE user='henry'
