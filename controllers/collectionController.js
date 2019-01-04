const db = require('../data/db')
const router = require('express').Router()

const crudMethodMaker = require('../helpers/crudMethodMaker')
const crudRouteMaker = require('../helpers/crudRouteMaker')

//* Sets up basic CRUD for Collections endpoint
const crudMethods = crudMethodMaker(db, 'collections')
crudRouteMaker(router, crudMethods)

router.get('/:collectionId/projects', getProjectsByCollectionId)

function getProjectsByCollectionId (req, res, next) {
  const { collectionId } = req.params
  db('projects')
    .where({ collectionId })
    .then(projects => res.status(200).json(projects))
}
module.exports = router
