require('dotenv').config()

const server = require('./server')
const defaults = require('./config/defaults')

const port = defaults.port
server.listen(port, () => {
    console.log(`Server is running at htpp://localhost:${port}`)
})