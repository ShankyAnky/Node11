var fs = require('fs')
var path = require('path')

module.exports.filesAllCaps =  (dir, callBack) => {
	fs.readdir('../../', function (err, files) {
		if (err) 
			callBack(err)
		else 
			callBack(null, files.map((f) => { return f.toUpperCase() }))
	})
}

module.exports.extnameAllCaps = (file) => {
	return path.extname(file).toUpperCase()
}