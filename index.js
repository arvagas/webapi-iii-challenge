const server = require('./server')

const port = 5000
server.listen(port, () => {
    console.log('Server is running at htpp://localhost:5000')
})