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
  .then(() => console.log('Connected to Database!'))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

const Horse = require('./models/horse')

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/queue')
})

app.get('/horses', (req, res) => {
  Horse.find()
    // sort by id (ascending)
    .sort({ id: 1 })
    .then(horses => res.render('horses.ejs', { horses }))
    .catch(console.error)
})

app.get('/horse/:id', (req, res) => {
  Horse.findOne({ id: req.params.id })
    .then(horse => res.render('horse.ejs', { horse }))
    .catch(console.error)
})

app.get('/user', (req, res) => {
  res.render('user.ejs')
})

app.get('/queue', (req, res) => {
  Horse.find()
    // sort by lastVisit (descending)
    .sort({ lastVisit: 1 })
    .then(horses => res.render('queue.ejs', { horses }))
    .catch(console.error)
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`)
})

module.exports = app
