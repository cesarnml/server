const db = require('../data/db')
const router = require('express').Router()

const crudMethodMaker = require('../helpers/crudMethodMaker')
const crudRouteMaker = require('../helpers/crudRouteMaker')

//* Sets up basic CRUD for users (github) endpoint
const crudMethods = crudMethodMaker(db, 'github')
crudRouteMaker(router, crudMethods)

router.get('/projectId/:projectId', getUsersByProjectId)

function getUsersByProjectId (req, res, next) {
  const { projectId } = req.params
  db('github')
    .where({ projectId })
    .then(users => res.status(200).json({ users }))
}
module.exports = router
