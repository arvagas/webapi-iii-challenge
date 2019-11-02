const express = require('express')

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

const server = express()

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`)

  next()
}

// @@@@@@@@@@ Global Middleware @@@@@@@@@@
server.use(logger)

// @@@@@@@@@@ Routing Handlers @@@@@@@@@@
server.use('/users', userRouter)
server.use('/posts', postRouter)

module.exports = server
