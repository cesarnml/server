const authRouter = require('./authController')
const userRouter = require('./userController')
const projectRouter = require('./projectController')

module.exports = server => {
  server.use('/auth', authRouter)
  server.use('/api/user', userRouter)
  server.use('/api/projects', projectRouter)
}
