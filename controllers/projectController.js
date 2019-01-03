const db = require('../data/db')
const router = require('express').Router()

const crudMethodMaker = require('../helpers/crudMethodMaker')
const crudRouteMaker = require('../helpers/crudRouteMaker')

//* Setups up basic CRUD for projects endpoint
const crudMethods = crudMethodMaker(db, 'projects')
crudRouteMaker(router, crudMethods)

//* Returns list of users signed up to project with given :projectId
router.get('/:projectId/users', getProjectUsers)

//* Route Handlers
function getProjectUsers (req, res, next) {
  const { projectId } = req.params
  db('github')
    .where({ projectId })
    .then(users => res.status(200).json(users))
    .catch(next)
}

module.exports = router
