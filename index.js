'use strict'

require('dotenv').config()
const express = require('express')
const app = express()

app.use('/public', express.static('public'))
/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})
*/
app.get('/horses', (req, res) => {
  res.render('horses.ejs')
})

app.get('/password', (req, res) => {
  res.render('password.ejs')
})

app.get('/horse', (req, res) => {
  res.render('horse.ejs')
})

app.get('/', (req, res) => {
  res.render('queue.ejs')
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

module.exports = app
