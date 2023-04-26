const config = require('./utils/config')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./middleware/middleware')


const cors = require('cors')
const mongoose = require('mongoose')


mongoose.connect(config.MONGODB_URI).then(_ => {
    console.log('Successful Connection to MongoDB')

}).catch(error => {
    console.log(`Error connecting to MongoDB ${error}`)
})


app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/testRouter')
    app.use('/api/testing', testRouter)
}


module.exports = app