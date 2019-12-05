'use strict'

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
let encoded_connection_url =
  'mongodb+srv://' +
  process.env.MONGO_USER +
  ':' +
  process.env.MONGO_PASS +
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
  res.send('Hello World!')
})

app.get('/horses', (req, res) => {
  res.render('horses.ejs')
})

app.get('/password', (req, res) => {
  res.render('password.ejs')
})
app.get('/horse', (req, res) => {
  res.render('horse.ejs')
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

module.exports = app
