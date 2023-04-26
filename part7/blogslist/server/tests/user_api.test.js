
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./user_test_helper')
const api = supertest(app)



beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(helper.initialUsers[0])
    await userObject.save()
    userObject = new User(helper.initialUsers[1])
    await userObject.save()
    userObject = new User(helper.initialUsers[2])
    await userObject.save()

})



describe('testing missing username and/or password field', () => {

    test('test missing username field', async () => {
        const result = await api.post('/api/users/').send(helper.userWithoutUsername).expect(422).expect('Content-Type', /application\/json/)
        expect(result.body.error).toEqual('Username and password field must be provided')
    })

    test('test missing passsword field', async () => {
        const result = await api.post('/api/users/').send(helper.userWithoutPassword).expect(422).expect('Content-Type', /application\/json/)
        expect(result.body.error).toEqual('Username and password field must be provided')
    })

    test('test missing username and passsword field', async () => {
        const result = await api.post('/api/users/').send(helper.userWithoutUsernameAndPassword).expect(422).expect('Content-Type', /application\/json/)
        expect(result.body.error).toEqual('Username and password field must be provided')
    })

})

describe('testing username or password field must be at least 3 characters long', () => {

    test('test username with less than 3 characters', async () => {
        const result = await api.post('/api/users/').send(helper.userWithUsername2Charac).expect(422).expect('Content-Type', /application\/json/)
        expect(result.body.error).toEqual('Username and password must be longer than 3 characters')
    })

    test('test password with less than 3 characters', async () => {
        const result = await api.post('/api/users/').send(helper.userWithPassword2Charac).expect(422).expect('Content-Type', /application\/json/)
        expect(result.body.error).toEqual('Username and password must be longer than 3 characters')
    })

    test('test password with less than 3 characters', async () => {
        const result = await api.post('/api/users/').send(helper.userWithUsernameAndPassword2Charac).expect(422).expect('Content-Type', /application\/json/)
        expect(result.body.error).toEqual('Username and password must be longer than 3 characters')
    })


})


describe('testing duplicates', () => {
    test('test duplicate username', async () => {
        const result = await api.post('/api/users/').send(helper.duplicateUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toEqual('Username has been used. Please try other username')
    })
})