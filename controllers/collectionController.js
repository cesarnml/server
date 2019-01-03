const db = require('../data/db')
const router = require('express').Router()

const crudMethodMaker = require('../helpers/crudMethodMaker')
const crudRouteMaker = require('../helpers/crudRouteMaker')

//* Sets up basic CRUD for Collections endpoint
const crudMethods = crudMethodMaker(db, 'collections')
crudRouteMaker(router, crudMethods)

router.get('/:id', getCollectionById)

function getCollectionById (req, res, next) {
  const { id } = req.params
  db('collections')
    .where({ id })
    .then(collection => res.status(200).json(collection))
}
module.exports = router
