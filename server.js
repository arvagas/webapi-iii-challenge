const express = require('express')

const server = express()

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

// @@@@@@@@@@ Global Middleware @@@@@@@@@@
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`)

  next()
}

server.use(logger)

module.exports = server
