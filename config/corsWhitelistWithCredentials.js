require('dotenv').config()

module.exports = {
  origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
  credentials: true
}
