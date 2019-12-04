'use strict'
const chai = require('chai')
chai.use(require('chai-http'))
chai.should()

const app = require('../index')

describe('Routes', () => {
  describe('GET /horses', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/horses'))
    })

    it('should get the horses page', () => {
      return req.then(res => res.should.have.status(200))
    })
    describe('The horses page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /horse', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/horse'))
    })

    it('should get the horse page', () => {
      return req.then(res => res.should.have.status(200))
    })
    describe('The horses page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /password', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/password'))
    })

    it('should get the password page', () => {
      return req.then(res => res.should.have.status(200))
    })

    describe('The password page', () => {
      it('should render HTML', () => {
        return req.then(res => res.should.be.html)
      })
    })
  })

  describe('GET /queue', () => {
    let req
    before(() => {
      return (req = chai.request(app).get('/queue'))
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
})
