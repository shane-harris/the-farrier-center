'use strict'

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const config = require('./config/config.js')

let encoded_connection_url =
  'mongodb+srv://' +
  config.username +
  ':' +
  config.password +
  '@farrier-dev-test-2pgqu.mongodb.net/test?retryWrites=true&w=majority'

mongoose
  .connect(encoded_connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database!')
  })
  .catch(err => {
    console.log(err)
  })

mongoose.connection.on('error', err => {
  console.log(err)
})

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('queue.ejs')
})

app.get('/horses', (req, res) => {
  res.render('horses.ejs')
})

app.get('/horse', (req, res) => {
  res.render('horse.ejs')
})

app.get('/user', (req, res) => {
  res.render('user.ejs')
})

app.get('/queue', (req, res) => {
  res.render('queue.ejs')
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`)
})

module.exports = app
