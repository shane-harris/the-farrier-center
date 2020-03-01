'use strict'

// This file is only responsible for setting up the 'app' variable
// This is necessary to avoid cyclic dependencies, i.e. a module required by index.js requires 'app'
// and therefore must require 'index.js'. If instead, both modules require this file, the circular
// dependency is resolved.

module.exports = require('express')()
