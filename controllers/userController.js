const router = require('express').Router()
const db = require('../data/db')

//* Route returns current logged in user data
router.get('/', getUser)

//* Route to update projectID foreign key for logged in user
router.put('/:projectId', toggleProjectId)

//* Route Handlers
function getUser (req, res, next) {
  const { user } = req //* if user has logged in, browser populates req with user object
  if (user && user.id) {
    res.status(200).json({ user }) //* return logged in user data to frontend
  } else {
    res.status(403).json({ msg: 'user must be login' }) //* user not logged in
  }
}

async function toggleProjectId (req, res, next) {
  const { user } = req //* Grab logged in user info from req
  const { projectId } = req.params //* Grab projectId from route param

  //* Check if project is full (5 members); if so return without modifications
  let project = await db('projects')
    .where({ id: Number(projectId) })
    .first()
  let { teamCount } = project

  if (teamCount >= 5) {
    return res
      .status(400)
      .json({ msg: 'project is full. please select another project.' })
  }

  if (user && user.id) {
    //* is the user logged in? YES => then
    const { id } = user

    if (!user.projectId) {
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
            .where({ id: Number(projectId) })
            .update({ teamCount: --teamCount })
        )
    }
  } else {
    //* NOT logged-in => Then
    res.status(401).json({ msg: 'user must be login' })
  }
}

module.exports = router
