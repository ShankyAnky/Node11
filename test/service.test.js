var proxyquire = require('proxyquire')
var assert = require('assert')
var service = require('../services/service')
var fs = require('fs')
var path = require('path')
var sinon = require('sinon')

describe('when calling filesAllCaps with', () => {
	var readdirSpy
	var foo
	before( () => {
		readdirSpy = sinon.spy(fs, 'readdir')
		foo = proxyquire('../services/service', { fs: { readdir: readdirSpy } })
	})
  
	after( () => {
		fs.readdir.restore()
	})
  
	it('calls fs.readdir with', (done) => {
		foo.filesAllCaps('../models', (err, files) => {
			assert.ifError(err)
			assert(fs.readdir.calledOnce)
			assert.equal(fs.readdir.getCall(0).args[0], '../../')
			done()
		})
	})
})