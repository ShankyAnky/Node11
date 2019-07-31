'use strict'

module.exports = {
	// A func that takes in two parameters `req` and `res` [request, response]
	getIndexPage: (req, res) => {
		console.log('req.user.checkUser()', req.user.checkUser())
		if (req.user.checkUser()){
			res.send('Hey')
		} else {
			res.send('Hello')
		}        
        
	},
	dummyAsycFunction: (value, callBack) => {
		setTimeout(() => {
			callBack(value ? 'Hey': 'Hello')
		}, 5000)
	}
}
