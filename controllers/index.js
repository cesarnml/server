const authRouter = require('./authController.js')

module.exports = server => {
  server.use('/auth', authRouter)
}
