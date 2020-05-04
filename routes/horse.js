'use strict'
//Import NPM modules
const express = require('express')
const router = express.Router()

//Import mongoose models
const Horse = require('../models/horse')
const Report = require('../models/report')
const Image = require('../models/image')
const User = require('../models/user')

//import middlewares
const { loggedIn } = require('../middleware/auth')
const { maybe } = require('../scripts/util.js')

const multer = require('multer')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')

//Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'dev-bojack',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
})

const parser = multer({ storage })

//Fields used to parse images from /:id/new-reports route
const imageFields = [
  { name: 'frontImages', maxCount: 6 },
  { name: 'backImages', maxCount: 6 },
  { name: 'backLeftImages', maxCount: 6 },
  { name: 'backRightImages', maxCount: 6 },
  { name: 'frontLeftImages', maxCount: 6 },
  { name: 'frontRightImages', maxCount: 6 },
  { name: 'reportImages', maxCount: 6 },
  { name: 'medicalImages', maxCont: 6 }
]

router.use('/public', express.static('public'))

// Setup Routes
router.get('/queue', loggedIn, async (req, res) => {
  const [horses, users] = await Promise.all([
    // Returns all horses to populate View All queue
    Horse.find({ deleted: false }).sort({ lastVisit: 1 }),
    // Returns only horses assigned to you for View Assigned Horse queue
    User.find({})
  ])
  const prunedUsers = users.map(user => ({
    fname: user.fname !== undefined && user.fname !== '' ? user.fname : 'NoFirstName',
    lname: user.lname !== undefined && user.lname !== '' ? user.lname : 'NoLastName',
    id: user.id
  }))

  res.render('queue.ejs', {
    user: req.user,
    horses: horses,
    users: prunedUsers,
    scripts: require('../scripts/queue-item')
  })
})

router.get('/all', loggedIn, async (_, res) => {
  // Get all horses and sort them by id (ascending)
  const horses = await Horse.find({ deleted: false })
    .sort({ name: 1 })
    .populate('image')
  res.render('horses.ejs', { horses: horses })
})

router.get('/new', loggedIn, (_, res) => {
  res.render('new-horse.ejs')
})

router.post('/new', loggedIn, parser.single('image'), async (req, res) => {
  // Create a new horse with all fields from the 'horse/new' page (req.body),
  // and 'lastVisit' set to now.
  const horse = new Horse({ lastVisit: new Date(), ...req.body })

  if (req.file) {
    const image = new Image({
      ref_id: horse._id,
      onType: 'horses',
      url: req.file.url,
      public_id: req.file.public_id
    })
    horse.image = image._id
    image.save()
  }
  await horse.save()

  if (req.body.submit === 'shoeing') {
    res.redirect(`/horse/${horse.id}/new-report`)
  } else {
    res.redirect('/horse/all')
  }
})

router.get('/:id', loggedIn, async (req, res) => {
  const [horse, shoeings] = await Promise.all([
    Horse.findOne({ id: req.params.id }).populate('image'),
    Report.find({ horse_id: req.params.id }).sort({ date: -1 })
  ])
  console.log(shoeings[0])
  res.render('horse.ejs', {
    horse: horse,
    shoeings: shoeings,
    updateable: true
  })
})

router.get('/:id/new-report', loggedIn, async (req, res) => {
  const [horse, shoeings] = await Promise.all([
    Horse.findOne({ id: req.params.id }),
    // Get the most recent medical analysis
    Report.find({ horse_id: req.params.id }).sort({ date: -1 })
  ])
  //check if first element in shoeing array has a medical field to avoid ReferenceError
  let medical = undefined
  if (shoeings.length > 0) {
    medical = maybe(shoeings[0].medical).or({})
  }
  const useLatest = medical === undefined ? false : true
  res.render('new-report.ejs', {
    horse: horse,
    medical: medical,
    updateable: useLatest
  })
})

router.post('/:id/new-report', parser.fields(imageFields), loggedIn, async (req, res) => {
  console.log(req.body)
  const horse = await Horse.findOne({ id: req.params.id })
  const report = new Report({
    horse_id: req.params.id,
    date: new Date(), //returns todays date
    farrier: req.user.username,
    jobType: req.body.job,
    front: {},
    back: {},
    images: [],
    medical: {
      gait: req.body.gait,
      lameness: req.body.lameness,
      blemishes: req.body.blemishes,
      laminitus: req.body.laminitus,
      notes: req.body.medicalNotes,
      images: []
    },
    notes: req.body.reportNotes
  })
  //When you make a new shoeing, if date was not provided update horses last visit.
  horse.lastVisit = report.date

  //If there are any shoeing info for front area left = horseshoe[0], right = horseshoe[1]
  if (req.body.job === 'Half' || req.body.job === 'Full' || req.body.job === 'Trim') {
    report.front.notes = req.body.frontNotes
    report.front.shoes = []
    report.front.materials = []
    report.front.services = []
    report.front.images = []

    if (req.body.frontShoes !== undefined) {
      if (req.body.frontShoes[0].length == 1) {
        report.front.shoes.push(req.body.frontShoes)
      } else if (req.body.frontShoes.length > 1) {
        for (const shoe of req.body.frontShoes) {
          report.front.shoes.push(shoe)
        }
      }
    }
    if (req.body.frontMaterials !== undefined) {
      if (req.body.frontMaterials[0].length == 1) {
        report.front.materials.push(req.body.frontMaterials)
      } else if (req.body.frontMaterials.length > 1) {
        for (const material of req.body.frontMaterials) {
          report.front.materials.push(material)
        }
      }
    }
    if (req.body.frontServices !== undefined) {
      if (req.body.frontServices[0].length == 1) {
        report.front.services.push(req.body.frontServices)
      } else if (req.body.frontServices.length > 1) {
        for (const service of req.body.frontServices) {
          report.front.services.push(service)
        }
      }
    }

    report.front.horseshoes.push({
      hoof: 'Left',
      shoeSize: req.body.frontLeftSize,
      notes: req.body.frontLeftNotes
    })

    report.front.horseshoes.push({
      hoof: 'Right',
      shoeSize: req.body.frontRightSize,
      notes: req.body.frontRightNotes
    })
  }
  //This catches the back area if there is any shoeing info for both front and back areas
  //left = horseshoe[0], right = horseshoe[1]
  if (req.body.job === 'Full') {
    report.back.notes = req.body.backNotes
    report.back.shoes = []
    report.back.materials = []
    report.back.services = []

    if (req.body.backShoes !== undefined) {
      if (req.body.backShoes[0].length == 1) {
        report.back.shoes.push(req.body.backShoes)
      } else if (req.body.backShoes.length > 1) {
        for (const shoe of req.body.backShoes) {
          report.back.shoes.push(shoe)
        }
      }
    }
    if (req.body.backMaterials !== undefined) {
      if (req.body.backMaterials[0].length == 1) {
        report.back.materials.push(req.body.backMaterials)
      } else if (req.body.backMaterials.length > 1) {
        for (const material of req.body.backMaterials) {
          report.back.materials.push(material)
        }
      }
    }
    if (req.body.backServices !== undefined) {
      if (req.body.backServices[0].length == 1) {
        report.back.services.push(req.body.backServices)
      } else if (req.body.backServices.length > 1) {
        for (const service of req.body.backServices) {
          report.back.services.push(service)
        }
      }
    }

    report.back.horseshoes.push({
      hoof: 'Left',
      shoeSize: req.body.backLeftSize,
      notes: req.body.backLeftNotes
    })

    report.back.horseshoes.push({
      hoof: 'Right',
      shoeSize: req.body.backRightSize,
      notes: req.body.backRightNotes
    })
  }

  //If there are any images
  if (req.files) {
    for (const field in req.files) {
      //each array in parser object, <= 6 fields
      const fieldname = field.substring(0, field.length - 6) //minus "Images" as named in horseshoe schema
      for (const image of req.files[field]) {
        //each file from the field array, <= 6 files

        //save image _id to relevant area
        switch (fieldname) {
          case 'front':
            report.front.images.push(image.url)
            break

          case 'frontLeft':
            if (report.front.horseshoes[0].hoof === 'Left') {
              report.front.horseshoes[0].images.push(image.url)
            } else if (report.front.horseshoes[1].hoof === 'Left') {
              report.front.horseshoes[1].images.push(image.url)
            }
            break

          case 'frontRight':
            if (report.front.horseshoes[1].hoof === 'Right') {
              report.front.horseshoes[1].images.push(image.url)
            } else if (report.front.horseshoes[0].hoof === 'Right') {
              report.front.horseshoes[0].images.push(image.url)
            }
            break

          case 'back':
            report.back.images.push(image.url)
            break

          case 'backLeft':
            if (report.back.horseshoes[0].hoof === 'Left') {
              report.back.horseshoes[0].images.push(image.url)
            } else if (report.back.horseshoes[1].hoof === 'Left') {
              report.back.horseshoes[1].images.push(image.url)
            }
            break

          case 'backRight':
            if (report.back.horseshoes[1].hoof === 'Right') {
              report.back.horseshoes[1].images.push(image.url)
            } else if (report.back.horseshoes[0].hoof === 'Right') {
              report.back.horseshoes[0].images.push(image.url)
            }
            break

          case 'medical':
            report.medical.images.push(image.url)
            break

          case 'report':
            report.images.push(image.url)
            break
        }
      }
    }
  }
  //If there are images to save the references are saved when shoeing is saved. Only saves subdocuments when shoeing is saved
  report.save()
  horse.save()
  res.redirect(`/horse/${req.params.id}`)
})

router.get('/:id/update', loggedIn, async (req, res) => {
  const horse = await Horse.findOne({ id: req.params.id })
  res.render('update-horse.ejs', { horse: horse, name: req.user.username })
})

router.post('/:id/update', parser.single('image'), loggedIn, async (req, res) => {
  const horse = await Horse.findOne({ id: req.params.id })
  horse.name = req.body.name
  horse.gender = req.body.gender
  horse.temperament = req.body.temperament
  horse.discipline = req.body.discipline
  horse.location = req.body.location
  horse.owner = req.body.owner
  horse.vet = req.body.vet
  horse.history = req.body.history
  if (req.file) {
    let image = await Image.findOne({ _id: horse.image })
    if (!image) {
      image = new Image({
        ref_id: horse._id,
        onType: 'horses',
        url: req.file.url,
        public_id: req.file.public_id
      })
      horse.image = image._id
      image.save()
    } else {
      image.url = req.file.url
      image.public_id = req.file.public_id
      image.save()
    }
  }
  horse.save()
  res.redirect(`/horse/${req.params.id}`)
})

router.post('/assign/:id', loggedIn, async (req, res) => {
  const horse = await Horse.findOne({ id: req.params.id })
  if (horse.assignedFarrier == -1 || horse.assignedFarrier === undefined) {
    horse.assignedFarrier = String(req.user.id)
    await horse.save(err => {
      console.log(err)
    })

    console.log(
      `Assigning horse '${horse.name}' to farrier '${req.user.fname + ' ' + req.user.lname}'.`
    )
  } else if (horse.assignedFarrier != req.user.id) {
    const assignedFarrier = await User.findOne({ _id: horse.assignedFarrier })

    console.log(
      `Horse '${horse.name}' is already assigned to farrier '${assignedFarrier.fname +
        ' ' +
        assignedFarrier.lname}'.`
    )
  }
  res.redirect(`/horse/queue/`)
})

router.post('/unassign/:id', loggedIn, async (req, res) => {
  const horse = await Horse.findOne({ id: req.params.id })
  if (horse.assignedFarrier === undefined) {
    console.log('Horse is not assigned a farrier')
    res.redirect(`/horse/queue/`)
  } else {
    const assignedFarrier = await User.findOne({ _id: horse.assignedFarrier })
    //admins can un-assign any horse from any user
    if (req.user.role === 'admin') {
      horse.assignedFarrier = undefined
      //only allow users to un-assign farrier if they are assigned to the horse
    } else if (horse.assignedFarrier === req.user.id) {
      horse.assignedFarrier = undefined
    }
    horse.save()
    console.log(
      `Unassigned horse '${horse.name}' from farrier '${assignedFarrier.fname +
        ' ' +
        assignedFarrier.lname}'`
    )

    res.redirect(`/horse/queue/`)
  }
})

router.post('/dismiss/:id', loggedIn, async (req, res) => {
  const horse = await Horse.findOne({ id: req.params.id })
  horse.lastVisit = new Date()
  if (horse.assignedFarrier === req.user.id) {
    horse.assignedFarrier = undefined
    await horse.save()
    console.log(`Unassigned horse '${horse.name}' from farrier '${req.user.username}'`)
  } else {
    await horse.save()
    console.log(`${horse.name} dismissed`)
  }
  res.redirect(`/horse/queue`)
})

router.post('/delete/:id', loggedIn, async (req, res) => {
  const horse = await Horse.findOne({ id: req.params.id })
  horse.deleted = true
  horse.save()
  console.log(`Deleting horse: '${horse.name}`)

  res.redirect(`/horse/all/`)
})

module.exports = router
