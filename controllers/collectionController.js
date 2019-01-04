const db = require('../data/db')
const router = require('express').Router()

const crudMethodMaker = require('../helpers/crudMethodMaker')
const crudRouteMaker = require('../helpers/crudRouteMaker')

//* Sets up basic CRUD for Collections endpoint
const crudMethods = crudMethodMaker(db, 'collections')
crudRouteMaker(router, crudMethods)

router.get('/:collectionId', getCollectionById)

function getCollectionById (req, res, next) {
  const { collectionId } = req.params
  db('projects')
    .where({ collectionId })
    .then(collection => res.status(200).json(collection))
}
module.exports = router
