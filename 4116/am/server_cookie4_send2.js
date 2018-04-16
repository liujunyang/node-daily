let http = require('http')
let querystring = require('querystring')
let server = http.createServer((req, res) => {
	if (req.url === '/favicon.ico') {return res.end();}

	res.writeHeader(200, {'set-cookie': ['a=12', 'b=5']})
	res.write('aaa')
	res.end()

})

server.listen(8080)