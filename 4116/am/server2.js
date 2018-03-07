let http = require('http')

let server = http.createServer((req, res) => {
	// req 请求 接收-输入
	// res 响应 发送-输出
	console.log('有人来啦', req.url)

	res.write('abc')
	res.end()

	// res.write() 输出
	// res.end() 结束
})

server.listen(8080)