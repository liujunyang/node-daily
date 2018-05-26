setTimeout(function(){
	console.log(1)
}, 1000)

process.nextTick(function A(){
	console.log(2)
	process.nextTick(function B(){
		console.log(3)
	})
})

console.log(4)

setTimeout(function(){
	console.log(5)
}, 0)

// 42351


// function sayHello(hello){
// 	if (hello) {
// 		return hello
// 	}

// 	return Promise.resolve('hello2world')
// }

// void bubble_sort(int arr[], int len){
// 	int i, j, temp
// 	// your code
// }

// A select * from t where c1=30;
// B select * from t where c1!=30;
// C select * from t where c1+10>20;
// D select * from t where c2 like "%abc";
// E select * from t where c2 like "abc%";
// F select * from t where c2 <> "abc";
// G select * from t where c2 in ("a", "b", "c");



// A ^The 表示所有以"The"开始的字符串
// B end$ 表示所有以"end"结尾的字符串
// C a.[0-9]表示一个字符串有一个a. 后面跟着0到9之间的一个数字
// D \w 用于匹配字母，数字或下划线字符
// E \d 用于匹配0到9的数字
// F ^[a-zA-Z]{1,9}$ 表示任意一个字母和1到9之间的一个数字


















