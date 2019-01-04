const db = require('../data/db')
const router = require('express').Router()

const crudMethodMaker = require('../helpers/crudMethodMaker')
const crudRouteMaker = require('../helpers/crudRouteMaker')

//* Sets up basic CRUD for Collections endpoint
const crudMethods = crudMethodMaker(db, 'collections')
crudRouteMaker(router, crudMethods)

router.get('/:collectionId/projects', getProjectsByCollectionId)

router.get(
  '/:collectionId/projects/members',
  getProjectsJoinMembersByCollectionId
)

function getProjectsByCollectionId (req, res, next) {
  const { collectionId } = req.params
  db('projects')
    .where({ collectionId })
    .then(projects => res.status(200).json(projects))
}

function getProjectsJoinMembersByCollectionId (req, res, next) {
  const { collectionId } = req.params
  console.log(' 🦄 \n', collectionId)
  db(`projects as p`)
    .join('github as g', 'g.projectId', 'p.id')
    .select(
      'p.id as projectId',
      'p.name as projectName',
      'p.description as projectDescription',
      'g.displayName as userDisplayName',
      'g.photo as photo'
    )
    .where('p.collectionId', 1)
    .then(projects => res.status(200).json(projects))
    .catch(next)
}

module.exports = router
