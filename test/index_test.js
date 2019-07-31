'use strict'

var mongoose = require('mongoose')
/* var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose); */
var User = require('../models/user')

var chai = require('chai')
var chaiHttp = require('chai-http')

var index = require('../index')

var should = chai.should()
var expect = chai.expect

var dummyService = require('../services/dummyservice.js')
var sinon = require('sinon')
var proxyquire = require('proxyquire')


chai.use(chaiHttp)


/* before(function(done) {
    mockgoose.prepareStorage().then(() => {
        mongoose.connect('mongodb://localhost:27017/userDb', () => {
            console.log('Db Connection is Done');
            done();
        });
    });
}) */

describe('Check Server is Running', () => {
	it('it should get reponse for Server is Running', (done) => {
		chai.request(index).get('/').end( (err, resp) => {
			resp.should.have.status(200)
			expect(resp.body).to.have.property('message').with.eq('Server is Running')
			done()
		})
	})
})

describe('Empty Database', () => {
	it('it should remove all data from database before running test', (done) => {
		User.remove({}, (err) => {
			done()
		})
	})
})

describe('Get User Data from DB', () => {
	it('it should get User Data Array ', (done) => {
		chai.request(index).get('/getUsers').end( (err, resp) => {
			resp.should.have.status(200)
			resp.body.should.be.a('array')
			resp.body.length.should.be.gte(0)
			done()
		})
	})
})

describe('Invalid Add User To DB', () => {
	it('it should throw error', (done) => {
		let user = {
			firstName: 'Vivek',
			lastName: 'Rajyaguru',
			contactNo: '9408753791',
			address: 'Address'
		}
		chai.request(index).post('/saveUser')
			.send(user).end((err, resp) => {
				resp.should.have.status(200)
				resp.body.should.have.property('errors') 
				done()
			})
	})
})


describe('valid Add User To DB', () => {
	it('it should save sample user to DB', (done) => {
		let user = {
			firstName: 'Vivek',
			lastName: 'Rajyaguru',
			email: 'vivek.rajyaguru@volansys.com',
			contactNo: '9408753791',
			address: 'Address'
		}
		chai.request(index).post('/saveUser')
			.send(user).end((err, resp) => {
				resp.should.have.status(200)
				resp.body.should.be.a('object')
				resp.body.should.have.property('message').eq('User successfully added!')
				resp.body.data.should.have.property('_id')
				resp.body.data.should.have.property('firstName')
				resp.body.data.should.have.property('lastName') 
				resp.body.data.should.have.property('email') 
				resp.body.data.should.have.property('contactNo') 
				resp.body.data.should.have.property('address') 
				done()
			})
	})
})



/** 
 * Sinon Call Dummy Service and Get Response 
*/
const user = {
	addUser: (name) => {
		this.name = name
	}
}
  

describe('Call Dummy Service Method using sinon', () => {
	it('it shows return defined message', () => {
		let user = {
			checkUser: () => {}
		}

		const checkUserStub = sinon.stub(user, 'checkUser').returns(true)

		let req = {
			user: user
		}
		let res = {
			send: () => {}
		}

		const mock = sinon.mock(res)

		mock.expects('send').once().withExactArgs('Hey')

		dummyService.getIndexPage(req, res)
		/* console.log(res.send); */

		/* expect(res.send.calledOnce).to.be.true; */
		/* expect(res.send.firstCall.args[0]).to.equal('Hey'); */

		mock.verify()
		/* expect(checkUserStub.calledOnce).to.be.true; */
	})
})


describe('Add User', () => {
	it('Should add a Dummy user', () => {
		sinon.spy(user, 'addUser')
		user.addUser('Vivek Rajyaguru')
		console.log(user.addUser)

		expect(user.addUser.calledOnce).to.be.true
	})
})


describe('AsyncTest', () => {
	it('Should Retuns value after interval', () => {
		dummyService.dummyAsycFunction(true, (value) => {
			expect(value).to.equal('Hey')
			done()
		})
	})
})