let http = require('http')

let server = http.createServer((req, res) => {
	console.log(req.url)

	if (req.url === '/favicon.ico') {
		res.end('')
		return;
	}

	console.log(req.headers)

	res.end('abab')
})

server.listen(8080)