let http = require('http')
let querystring = require('querystring')
let server = http.createServer((req, res) => {
	console.log(req.url)

	if (req.url === '/favicon.ico') {
		res.end('')
		return;
	}

	console.log(req.headers.cookie)

	let cookie = {}

	if (req.headers.cookie) {
		cookie = querystring.parse(req.headers.cookie.replace(/; /g, '&'))
	}

	console.log(99, cookie)

	res.end('abab')
})

server.listen(8081)