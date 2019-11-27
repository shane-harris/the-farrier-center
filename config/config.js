require('dotenv').config()
const config = {
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS
}

module.exports = config
