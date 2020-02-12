'use strict'

require('dotenv').config()
const config = {
  port: process.env.PORT || 8000,
  mongo_url:
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}` +
    '@farrier-dev-test-2pgqu.mongodb.net/test?retryWrites=true&w=majority'
}

module.exports = config
