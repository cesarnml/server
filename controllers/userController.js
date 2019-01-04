const router = require('express').Router()
const db = require('../data/db')

//* Route returns current logged in user data
router.get('/', getUser)

//* Route to update projectID foreign key for logged in user
router.get('/:projectId', toggleProjectId)

//* Route Handlers
function getUser (req, res) {
  db('github')
    .where({ id: req.user.id })
    .first()
    .then(user => res.send(user))
}

async function toggleProjectId (req, res, next) {
  const { user } = req //* Grab logged in user info from req
  const { projectId } = req.params //* Grab projectId from route param

  //* Check if project is full (5 members); if so return without modifications
  let project = await db('projects')
    .where({ id: Number(projectId) })
    .first()
  let { teamCount } = project

  let currentUser = await db('github')
    .where({ id: req.user.id })
    .first()

  if (teamCount >= 5) {
    return res
      .status(400)
      .json({ msg: 'project is full. please select another project.' })
  }

  if (user && user.id) {
    //* is the user logged in? YES => then
    const { id } = user
    console.log(
      '\n 🦄 user',
      user,
      '\n 🦄 \n ',
      'projectId',
      projectId,
      'currentUser.projectId',
      currentUser.projectId
    )

    if (!currentUser.projectId) {
      //* if user's projectId is null, sign-up user to project with projectID
      db('github')
        .where({ id })
        .update({ projectId })
        .then(count =>
          res.status(200).json({
            msg: `user with id ${id} signed up to project with id ${projectId}`
          })
        )
        .then(() =>
          //* increment teamCount for project with id = projectId
          db('projects')
            .where({ id: Number(projectId) })
            .update({ teamCount: ++teamCount })
        )
    } else {
      //* if user's projectId is notNull; de-register user from project with projectId
      db('github')
        .where({ id })
        .update({ projectId: null })
        .then(count =>
          res
            .status(200)
            .json({ msg: `user removed from project with id ${projectId}` })
        )
        .then(() =>
          //* decrement teamCount for project with projectId
          db('projects')
            .where({ id: Number(currentUser.projectId) })
            .update({ teamCount: --teamCount })
        )
    }
  } else {
    //* NOT logged-in => Then
    res.status(401).json({ msg: 'user must be login' })
  }
}

module.exports = router
