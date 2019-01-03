const authRouter = require('./authController') //* Controls Auth Resource
const collectionRouter = require('./collectionController') //* Controls Collections Resource
const projectRouter = require('./projectController') //* Controls Projects Resource
const usersRouter = require('./usersController') //* Controls Users(GitHub) Resource
const userRouter = require('./userController') //* Controls Logged-In User Resource

module.exports = server => {
  server.use('/auth', authRouter)
  server.use('/api/collections', collectionRouter)
  server.use('/api/projects', projectRouter)
  server.use('/api/users', usersRouter)
  server.use('/api/user', userRouter)
}
