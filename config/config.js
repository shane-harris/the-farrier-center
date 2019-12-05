require('dotenv').config()
const config = {
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS,
  port: process.env.PORT || 8000
}

module.exports = config
