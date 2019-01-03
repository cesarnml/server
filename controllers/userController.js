const router = require('express').Router()
const db = require('../data/db')

//* Route returns current logged in user data
router.get('/', getUser)

//* Route to update projectID foreign key for logged in user
router.put('/:projectId', toggleProjectId)

//* Route Handlers
function getUser (req, res, next) {
  const { user } = req
  if (user && user.id) {
    res.status(200).json({ user })
  } else {
    res.status(403).json({ msg: 'you must be logged in' })
  }
}

async function toggleProjectId (req, res, next) {
  const { user } = req
  const { projectId } = req.params

  let project = await db('projects')
    .where({ id: Number(projectId) })
    .first()
  let { teamCount } = project

  if (user && user.id) {
    const { id } = user

    if (!user.projectId && teamCount < 5) {
      db('github')
        .where({ id })
        .update({ projectId })
        .then(count =>
          res
            .status(200)
            .json({
              msg: `user with id ${id} signs up for project with id ${projectId}`
            })
        )
        .then(() =>
          db('projects')
            .where({ id: Number(projectId) })
            .update({ teamCount: ++teamCount })
        )
    } else if (!user.projectId && teamCount >= 5) {
      res.status(203).json({ msg: 'project is full (max 5 team members)' })
    } else {
      db('github')
        .where({ id })
        .update({ projectId: null })
        .then(() =>
          db('projects')
            .where({ id: Number(projectId) })
            .update({ teamCount: --teamCount })
        )
    }
  } else {
    res.status(203).json({ msg: 'user must be logged in' })
  }
}

module.exports = router
