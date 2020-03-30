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
const indexRoutes = require('./routes/index')
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const horseRoutes = require('./routes/horse')
const initDb = require('./scripts/init-db')
const app = require('./scripts/app')

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'))

// Set up various middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}
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

// Middleware that exposes the user object from the request into the response page
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.use(require('./middleware/style'))

// Configure routes
app.use('/', indexRoutes)
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/horse', horseRoutes)

// catch 404 and forward to error handler
app.use((_, __, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, _, res) => {
    res.status(err.status || 500)
    res.render('error.ejs', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, _, res) => {
  res.status(err.status || 500)
  res.render('error.ejs', {
    message: err.message,
    error: {}
  })
})

// Connect to the database
app.set('database-connected', false)

mongoose
  .connect(config.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to database.')
    // Send out an event that can be listened to elsewhere
    app.emit('event:database-connected')
    app.set('database-connected', true)
    initDb.makeDefaultAdmin()
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

// Listen for user requests
app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}`)
})
