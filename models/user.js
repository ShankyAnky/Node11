var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	'firstName': {type: String, required: true},
	'lastName': {type: String, required: true},
	'email': {type: String, required: true},
	'contactNo': {type: String, required: false},
	'address': {type: String, required: false}
})

module.exports = mongoose.model('User', userSchema)