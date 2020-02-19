'use strict'

const express = require('express')
const router = express.Router()
const Medical = require('../models/medical')
const Horse = require('../models/horse')
const { loggedIn } = require('../middleware/auth')

router.use('/public', express.static('public'))

router.get('/queue', loggedIn, (req, res) => {
  Horse.find()
    // sort by lastVisit (ascending)
    .sort({ lastVisit: 1 })
    .then(horses =>
      res.render('queue.ejs', {
        username: req.user.username,
        horses: horses,
        scripts: require('../scripts/queue-item')
      })
    )
    .catch(console.error)
})

router.get('/all', loggedIn, (req, res) => {
  Horse.find()
    // sort by id (ascending)
    .sort({ id: 1 })
    .then(horses => res.render('horses.ejs', { horses: horses }))
    .catch(console.error)
})

router.get('/new', loggedIn, (req, res) => {
  res.render('new-horse.ejs')
})

router.post('/new', loggedIn, (req, res) => {
  console.log(req.body)
  new Horse(req.body).save(console.error)
  res.redirect('/horse/all')
})

router.get('/:id', loggedIn, (req, res) => {
  Horse.findOne({ id: req.params.id })
    .then(horse => res.render('horse.ejs', { horse: horse }))
    .catch(console.error)
})

router.get('/:id/new-medical-analysis', loggedIn, (req, res) => {
  Horse.findOne({ id: req.params.id })
    .then(horse => res.render('new-medical-analysis.ejs', { horse }))
    .catch(console.error)
})

router.post('/:id/new-medical-analysis', loggedIn, (req, res) => {
  console.log(req.body)
  new Medical({
    horse_id: req.params.id,
    date: new Date(),
    farrier: 'Default Steve',
    ...req.body
  }).save(console.error)
  res.redirect(`/horse/${req.params.id}`)
})

router.get('/new-shoeing', loggedIn, (req, res) => {
  res.render('new-shoeing.ejs')
})

module.exports = router
