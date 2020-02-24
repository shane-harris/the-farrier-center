'use strict'

const chai = require('chai')
chai.use(require('chai-http'))
chai.should()

const { valueOr } = require('../scripts/util')

describe('Utility functions', () => {
  describe('valueOr', () => {
    it('Should retun the value if it is not undefined', () => {
      valueOr('abc', 'def').should.equal('abc')
      valueOr(32, 'something else').should.equal(32)
      const val = valueOr(['abc', 'def'], 3)
      val.should.be.an('array')
      val.length.should.equal(2)
      val[0].should.equal('abc')
      val[1].should.equal('def')
    })
    it('Should return default if value is undefined', () => {
      valueOr(undefined, 'abc').should.equal('abc')
      valueOr(undefined, 2).should.equal(2)
      const val = valueOr(undefined, [1, 2])
      val.should.be.an('array')
      val.length.should.equal(2)
      val[0].should.equal(1)
      val[1].should.equal(2)
    })
  })
})
