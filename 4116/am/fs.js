let fs = require('fs')
console.log(process.cwd())

fs.readFile('./4116/am/1.js', (err, data) => {
	console.log(err)
	console.log(data)
})