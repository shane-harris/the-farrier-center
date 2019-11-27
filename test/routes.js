'use strict'
const chai = require('chai')
chai.use(require('chai-http'))
chai.should()

const app = require('../index')

describe('Routes', () => {
  describe('GET /horses', () => {
    let getHorses
    before(() => {
      getHorses = chai.request(app).get('/horses')
    })

    it('should get the horses page', () => {
      getHorses.then(res => res.should.have.status(200))
    })
    describe('The horses page', () => {
      it('should render HTML', () => {
        getHorses.then(res => res.should.be.html)
      })
    })
  })
})
