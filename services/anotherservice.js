
var service = require('./service')

service.increaseCounter()

module.exports = {
	counter: () => { return 'counter called'}
}