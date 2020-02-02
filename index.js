'use strict'

require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const config = require('./config/config.js')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')

const app = express()

app.use('/public', express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ keys: ['secretkey1', 'secretkey2', '...'] }))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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

mongoose.set('useCreateIndex', true)

app.use(require('./routes'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render('error.ejs', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render('error.ejs', {
    message: err.message,
    error: {}
  })
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`)
})

module.exports = app
