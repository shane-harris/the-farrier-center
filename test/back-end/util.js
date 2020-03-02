'use strict'

const chai = require('chai')
chai.use(require('chai-http'))
chai.should()

const { maybe } = require('../../scripts/util')

describe('Utility functions', () => {
  describe('maybe().or()', () => {
    it('Should retun the value if it is not undefined', () => {
      maybe('abc')
        .or('def')
        .should.equal('abc')
      maybe(32)
        .or('something else')
        .should.equal(32)
      const val = maybe(['abc', 'def']).or(3)
      val.should.be.an('array')
      val.length.should.equal(2)
      val[0].should.equal('abc')
      val[1].should.equal('def')
    })
    it('Should return default if value is undefined', () => {
      maybe(undefined)
        .or('abc')
        .should.equal('abc')
      maybe(undefined)
        .or(2)
        .should.equal(2)
      const val = maybe(undefined).or([1, 2])
      val.should.be.an('array')
      val.length.should.equal(2)
      val[0].should.equal(1)
      val[1].should.equal(2)
    })
  })
})
