let express = require('express')
let server = express()

server.listen(8080)

server.use('/a.html', (req, res) => {
  res.send('aaa')
})