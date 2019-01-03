const db = require('../data/db')
const router = require('express').Router()

const crudMethodMaker = require('../helpers/crudMethodMaker')
const crudRouteMaker = require('../helpers/crudRouteMaker')

//* Setups up basic CRUD for projects endpoint
const crudMethods = crudMethodMaker(db, 'projects')
crudRouteMaker(router, crudMethods)

//* Returns list of users signed up to project with given ID
router.get('/:id/users')

module.exports = router
