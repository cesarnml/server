module.exports = passport => {
  const config = require('./index.js')
  const GitHubStrategy = require('passport-github').Strategy

  passport.use(
    new GitHubStrategy(
      {
        clientID: config.gitHubStrategy.clientID,
        clientSecret: config.gitHubStrategy.clientSecret,
        callbackURL: config.gitHubStrategy.callbackURL
      },
      config.gitHubStrategy.verifyCallback
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}
