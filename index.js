'use strict'

const config = require('./config/config.js')
const cookieParser = require('cookie-parser')
const express = require('express')
const flash = require('connect-flash')
const LocalStrategy = require('passport-local').Strategy
const logger = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const session = require('cookie-session')

const app = express()

app.set('views', path.join(__dirname, 'views'))

// Set up various middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ keys: ['secretkey1', 'secretkey2', '...'] }))
app.use(flash())

// Passport middleware is used for user session tracking and authentication
app.use(passport.initialize())
app.use(passport.session())

// Establish how passport will go about authenticating users
const User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))

// Establish how passport will send user information over the network
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})

mongoose.set('useCreateIndex', true)

// Configure routes, as specified in 'routes.js'
app.use(require('./routes'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

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

// Connect to the database
mongoose
  .connect(config.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to Database!'))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

// Listen for user requests
app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`)
})

module.exports = app
