const authRouter = require('./authController') //* Controls Auth Resource
const userRouter = require('./userController') //* Controls Logged-In User Resource
const usersRouter = require('./usersController') //* Controls Users(GitHub) Resource
const projectRouter = require('./projectController') //* Controls Projects Resource

module.exports = server => {
  server.use('/auth', authRouter)
  server.use('/api/user', userRouter)
  server.use('/api/users', usersRouter)
  server.use('/api/projects', projectRouter)
}
