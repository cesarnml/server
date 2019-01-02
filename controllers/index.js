const authRouter = require('./authController')
const userRouter = require('./userController')

module.exports = server => {
  server.use('/auth', authRouter)
  server.use('/user', userRouter)
}
