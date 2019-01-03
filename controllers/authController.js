require('dotenv').config()
const router = require('express').Router()
const passport = require('passport')
const redirectURL = `${process.env.CLIENT_URL}/signin`

//* Import Helpers/Middleware
const generateToken = require('../helpers/generateToken')

//* Destroy cookie session & req.user
router.get('/logout', logout)

//* GitHub OAuth
router.get('/github', passport.authenticate('github'))
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: redirectURL
  }),
  socialLogin
)

//* Route Handlers
function logout (req, res, next) {
  req.session = null
  req.logout()
  res.status(200).json({ msg: 'all okay' })
}

function socialLogin (req, res, next) {
  const token = generateToken(req.user)
  req.session.token = token
  res.redirect(`${process.env.CLIENT_URL}/user`)
}

module.exports = router
