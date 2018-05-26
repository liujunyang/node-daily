let fs = require('fs')
console.log(process.cwd())

// 读文件
// readFile(文件名, 回调)
fs.readFile('./4116/am/1.js', (err, data) => {
	// console.log(err)
	if (err) {
		console.log(err)
	} else {
		console.log(data.toString())
		// console.log(data.toString('utf8'))
	}
})