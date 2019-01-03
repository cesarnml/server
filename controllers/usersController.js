const db = require('../data/db')
const router = require('express').Router()

const crudMethodMaker = require('../helpers/crudMethodMaker')
const crudRouteMaker = require('../helpers/crudRouteMaker')

//* Sets up basic CRUD for USERS(github) endpoint
const crudMethods = crudMethodMaker(db, 'github')
crudRouteMaker(router, crudMethods)

module.exports = router
