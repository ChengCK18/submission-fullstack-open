const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const userHelper = require('./user_test_helper')
const helper = require('./blog_test_helper')
const api = supertest(app)

let validLoginToken = ''


//Use in-memory MongoDB in actual practice or Docker container with MongoDB ;D
//Populate test db with test data, clear data then fill in two row of data
beforeEach(async () => {
    await User.deleteMany({})

    await api.post('/api/users').send(userHelper.initialUsers[0])
    await api.post('/api/users').send(userHelper.initialUsers[1])
    await api.post('/api/users').send(userHelper.initialUsers[2])

    const loginUser = {
        username: userHelper.initialUsers[0].username,
        password: userHelper.initialUsers[0].password
    }
    validLoginToken = await api.post('/api/login').send(loginUser)
    validLoginToken = 'bearer ' + validLoginToken.body.token

    await Blog.deleteMany({})
    await api.post('/api/blogs').set('Authorization', validLoginToken).send(helper.initialBlogs[0])
    await api.post('/api/blogs').set('Authorization', validLoginToken).send(helper.initialBlogs[1])
    await api.post('/api/blogs').set('Authorization', validLoginToken).send(helper.initialBlogs[2])

})


describe('testing http request to "/api/blogs" endpoint', () => {

    test('ex4.8 GET -> blogs quantity are correct and in JSON format', async () => {
        const response = await api.get('/api/blogs').set('Authorization', validLoginToken).expect(200).expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialBlogs.length)

    })

    test('ex4.9 GET -> verifies that the unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs').set('Authorization', validLoginToken).expect(200).expect('Content-Type', /application\/json/)
        expect(response.body[0].id).toBeDefined()
        expect(response.body[1].id).toBeDefined()
        expect(response.body[2].id).toBeDefined()

        //expect(response.body[0].id).toHaveLength(initialBlogs.length)
    })

    test('ex4.10 POST ->  verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {

        await api.post('/api/blogs').set('Authorization', validLoginToken).send(helper.newBlog).expect(201).expect('Content-Type', /application\/json/)


        const blogsAfterPost = await helper.allBlogsInDb()
        expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAfterPost.map(blog => blog.title) //get all blogs objects' title property
        expect(contents).toContain('Peanuts') //newly added blog
        expect(contents).toContain('React patterns') //existing blog
    }, 20000)

    test('ex4.11 POST -> verifies that if the likes property is missing from the request, \
    it will default to the value 0', async () => {
        //Modified mongoose data model schema to add default value to 'likes' property if undefined
        const response = await api.post('/api/blogs').set('Authorization', validLoginToken).send(helper.newBlogWithoutLikes).expect(201).expect('Content-Type', /application\/json/)
        expect(response.body.likes).toBeDefined()
        expect(response.body.likes).toEqual(0)


    })


    test('ex4.12 POST ->  \
    verifies that if the title and url properties are missing from the request \
    data, the backend responds to the request with the status code 400 Bad Request', async () => {
        //Modified mongoose data model schema to add default value to 'likes' property if undefined
        await api.post('/api/blogs').set('Authorization', validLoginToken).send(helper.newBlogWithoutTitleAndUrl).expect(400).expect('Content-Type', /application\/json/)

    })

})


describe('testing delete blog post', () => {

    test('test removal of single blog post with valid id', async () => {
        const valid_id = helper.initialBlogs[0]._id
        await api.delete(`/api/blogs/${valid_id}`).set('Authorization', validLoginToken).expect(204)
    })

    test('test removal of single blog post with invalid id', async () => {
        const invalid_id = 'abc'
        await api.delete(`/api/blogs/${invalid_id}`).set('Authorization', validLoginToken).expect(400)
    }, 10000)
})

describe('testing update blog post', () => {

    test('test update of single blog post with valid id', async () => {
        const valid_id = helper.initialBlogs[0]._id

        const result = await api.put(`/api/blogs/${valid_id}`).set('Authorization', validLoginToken).send(helper.updatedNote).expect(200).expect('Content-Type', /application\/json/)

        expect(result.body.title).toEqual('Peanutsssssss')
        expect(result.body.likes).toEqual(100)
    })

    test('test update of single blog post with invalid id', async () => {
        const valid_id = 'abc'

        await api.put(`/api/blogs/${valid_id}`).set('Authorization', validLoginToken).send(helper.updatedNote).expect(400)


    })

})


describe('token based testing', () => {
    test('ex4.23 POST -> write a new test to ensure adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
        const response = await api.post('/api/blogs').send(helper.newBlogWithoutLikes).expect(401).expect('Content-Type', /application\/json/)

    })

    test('ex4.23 extra POST -> adding blog with valid token', async () => {
        const response = await api.post('/api/blogs').set('Authorization', validLoginToken).send(helper.newBlogWithoutLikes).expect(201).expect('Content-Type', /application\/json/)

    })
})