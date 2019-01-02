const cookieSession = require('./cookieSession')
const rateLimit = require('./rateLimit')
const gitHubStrategy = require('./gitHubStrategy')
const corsWhitelistWithCredentials = require('./corsWhitelistWithCredentials')
const passportConfig = require('./passportConfig')

module.exports = {
  cookieSession,
  rateLimit,
  gitHubStrategy,
  corsWhitelistWithCredentials,
  passportConfig
}
