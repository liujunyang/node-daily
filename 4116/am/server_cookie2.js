console.log(99)

try{
	throw 1
} catch (e) {
	console.log(88, e)
	var a = 3
	console.log(89, a)
}

// 可以访问到，说明在 catch 块中命名的变量外部可以访问到，
// 只有 catch 的参数才不会被外部访问到
console.log(100, a)