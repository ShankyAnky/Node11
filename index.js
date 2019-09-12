var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose')
var User = require('./models/user')
var fs = require('fs') 
var ca = fs.readFileSync('./mongodb-cert.crt')
var key = fs.readFileSync('./mongodb.pem')   
var cert = fs.readFileSync('./mongodb-cert.crt') 
var http = require('http')

var app = express()

/**
 * Connection Options for MongoDB
 * @namespace 
 */
var options = {
	autoIndex: false, // Don't build indexes
	reconnectTries: 30, // Retry up to 30 times
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	bufferMaxEntries: 0,
	useNewUrlParser: true,
	sslValidate: true,
	sslKey: cert,
	sslCert: cert
}


/**
 * MongoDb Connection Function
 * Will retry after 5 seconds if not connected
 * @function
 * @requires {object} connection configuration object
 */
const connectWithRetry = () => {
	mongoose.connect('mongodb+srv://docker:harekrishna123@cluster0-lgyzo.mongodb.net/test
', options).then(()=>{
		console.log('MongoDB is connected')
	}).catch(err=>{
		console.log('MongoDB connection unsuccessful, retry after 5 seconds.', err)
		setTimeout(connectWithRetry, 5000)
	})
}

connectWithRetry()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())                                    
app.use(bodyParser.json({ type: 'application/json'}))  
app.use(cookieParser())


/**
 * Rest API 
 * @function
 * @returns {string} Server is Running
 */
app.get('/', (req, resp) => resp.json({status: 200, message: 'Server is Running'}) )

/**
 * API for get all users data
 * @function
 * @returns {object} json data for all users
 */

app.get('/getUsers', (req, resp) => {
	User.find((err, result) => {
		if (err) resp.send({status: 500, data: err})
		resp.json(result)
	})
})


/**
 * API for Save User to DB
 * @function
 * @requires {object} request object with below params in body
 * @param {string} firstName required
 * @param {string} lastName required
 * @param {string} email required
 * @param {string} contactNo
 * @param {string} address
 * 
 * @returns {object} if error returns error object else return string with user data back
 */
app.post('/saveUser', (req, resp) => {
	var user = new User({
		'firstName': req.body.firstName,
		'lastName': req.body.lastName,
		'email': req.body.email,
		'contactNo': req.body.contactNo,
		'address': req.body.address
	})
	user.save((err, data) => {
		if (err) 
			resp.send(err)
		else 
			resp.json({message: 'User successfully added!', data })
	})
})

/**
 * Delete User By Id
 * /deleteUser/:id
 * @function
 * @param {string} id in url
 * @return {json} json Object with Message and result object
 * 
 */
app.delete('/deleteUser/:id', (req, resp) => {
	User.remove({_id: req.param.id}, (err, data) => {
		if (err) resp.send(err)
		resp.json({message: 'User successfully Deleted.'}, data)
	})
})

/**
 * Get User By Id API
 * /getUserById/:id
 * @function
 * @param  {string} userId in url
 * @returns {object} userObject
 */
app.get('/getUserById/:id', (req, resp) => {
	User.findById(req.param.id, (err, data) => {
		if(err) resp.send(err)
		resp.json(data)
	})
})

/**
 * Update User By Id 
 * /updateUser/:id
 * @function
 * @param {string} id in url
 * @param {string} firstName required
 * @param {string} lastName required
 * @param {string} email required
 * @param {string} contactNo
 * @param {string} address
 * 
 * @returns {object} updated User Object
 */

app.post('/updateUser/:id', (req, resp) => {
	User.findById({_id: req.param.id}, (err, data) => {
		if(err) resp.send(err)
		Object.assign(data, req.body).save( (err, result) => {
			if(err) resp.send(err)
			resp.json({message: 'User Updated.', result})
		})
	})
})

/* app.listen(3000, () => {
    console.log('Server is Running on Port 3000');
}); */
const server = http.createServer(app)
server.on('listening',function(){
	console.log('ok, server is running')
})

server.listen(8080)


module.exports = server
