const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongoose.connect(url)
	.then(result => {
		console.log('Successful Connection!')
	})
	.catch(error => {
		console.log(`Error in connection: ${error}`)
	})

const personSchema = mongoose.Schema({
	name: { type: String, minlength: 3, required: true }, //unique is checked using 'mongoose-unique-validator'
	phoneNumber: { type: String, minlength: 8, required: true }
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})
personSchema.plugin(uniqueValidator)
module.exports = mongoose.model('person', personSchema)

