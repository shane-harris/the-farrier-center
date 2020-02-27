'use strict'
const chai = require('chai')
chai.use(require('chai-http'))
chai.should()

const app = require('../index')

describe('Routes', () => {
  //Test GET routes
  describe('GET /', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/'))
    })

    it('should get the queue page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The queue page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /user', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/user'))
    })

    it('should get the user page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The user page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /user/theme', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/user/theme'))
    })

    it('should get the user page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The user theme page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /login', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/login'))
    })

    it('should get the login page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The login page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /search', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/search'))
    })

    it('should get the search page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The search page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /horse/queue', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/horse/queue'))
    })

    it('should get the queue page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The queue page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /horse/all', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/horse/all'))
    })

    it('should get the all horses page', () => {
      return req.then(res => res.should.have.status(200))
    })
    describe('The all horses page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /horse/new', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/horse/new'))
    })

    it('should get the new horse page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The new horse page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /horse/1/new-medical-analysis', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/horse/1/new-medical-analysis'))
    })

    it('should get the new medical analysis page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The new medical analysis page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /horse/1/new-shoeing', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/horse/1/new-shoeing'))
    })

    it('should get the new shoeing page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The new shoeing page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /horse/1/update', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/horse/1/update'))
    })

    it('should get the update horse page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The update horse page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /horse/1', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/horse/1'))
    })

    it('should get the horse page', () => {
      return req.then(res => res.should.have.status(200))
    })
    describe('The horse page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  //Test POST routes
})
