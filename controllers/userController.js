const router = require('express').Router()

router.get('/', getUser)

//* Route Handler
function getUser (req, res, next) {
  const { user } = req
  if (user && user.id) {
    res.status(200).json({ user })
  } else {
    res.status(403).json({ msg: 'you must be logged in' })
  }
}

module.exports = router
