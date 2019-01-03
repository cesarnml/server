const db = require('../data/db')
const router = require('express').Router()

const crudMethodMaker = require('../helpers/crudMethodMaker')
const crudRouteMaker = require('../helpers/crudRouteMaker')

const crudMethods = crudMethodMaker(db, 'projects')
crudRouteMaker(router, crudMethods)

module.exports = router
