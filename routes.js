'use strict'

const passport = require('passport')
const express = require('express')
const router = require('express').Router()
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const Medical = require('./models/medical')
const Horse = require('./models/horse')
const User = require('./models/user')

const { sendRegEmail } = require('./middleware/emailer')
const { loggedIn, redirectIfLoggedIn, isAdmin } = require('./middleware/auth')


// Serve contents of 'public' folder to the client
router.use('/public', express.static('public'))

module.exports = router
