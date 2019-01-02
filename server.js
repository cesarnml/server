const server = require('express')()
const errorHandler = require('./helpers/errorHandler')

//* Middleware & Routes
require('./middleware')(server)
require('./controllers')(server)

//* Error Handler
server.use(errorHandler)

module.exports = server
