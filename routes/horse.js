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
    //TODO Request Help on doing second database call and handling no return
    //How can I accomplish Updateable = true in here?
    //set updateabl: false in new-medical-analysis.ejs
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

router.get('/:id/new-shoeing', loggedIn, (req, res) => {
  res.render('new-shoeing.ejs')
})

router.get('/:id/update', loggedIn, (req, res) => {
  Horse.findOne({ id: req.params.id })
    .then(horse => res.render('update-horse.ejs', { horse, name: req.user.username }))
    .catch(console.error)
})

router.post('/:id/update', loggedIn, (req, res) => {
  console.log(req.body)
  Horse.findOne({ id: req.params.id }).then(horse => {
    horse.name = req.body.name
    horse.gender = req.body.gender
    horse.temperament = req.body.temperament
    horse.discipline = req.body.discipline
    horse.location = req.body.location
    horse.owner = req.body.owner
    horse.vet = req.body.vet
    horse.history = req.body.history
    horse.save()
  })
  res.redirect(`/horse/${req.params.id}`)
})
module.exports = router
