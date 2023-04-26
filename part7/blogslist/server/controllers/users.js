const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.get('/', async (request, response) => {
    const result = await User.find({}).populate('blogs')

    response.status(200).json(result)

})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    console.log('hey here')
    console.log(request.body)
    try {
        if (username === undefined || password === undefined) {
            const error = new Error('Username and password field must be provided')
            error.code = 422
            throw error
        }



        if (username.length < 3 || password.length < 3) {
            const error = new Error('Username and password must be longer than 3 characters')
            error.code = 422
            throw error
        }

        const result = await User.find({ username: username })
        if (result.length >= 1) {
            const error = new Error('Username has been used. Please try other username')
            error.code = 400
            throw error
        }


        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = user.save()


        response.status(201).json(savedUser)
    } catch (errorMsg) {

        response.status(errorMsg.code).json({ error: errorMsg.message })
    }


})




module.exports = userRouter