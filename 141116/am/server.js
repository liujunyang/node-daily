let http = require('http')

//createServer(回调)
let server = http.createServer(() => {
	// 访问
	console.log('有人来啦')
})

console.log(server)
// listen(端口号-数字)
server.listen(8080)