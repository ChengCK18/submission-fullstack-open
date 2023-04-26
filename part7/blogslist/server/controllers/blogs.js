const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (_, response) => {

    const blogs = await Blog.find({}).populate('user')

    response.status(200).json(blogs)

})


blogsRouter.get('/:id', async (request, response) => {

    const request_id = String(request.params.id)

    if (!request_id.match(/^[0-9a-fA-F]{24}$/)) {
        return response.status(400).json({ error: 'invalid blog id format' })
    }

    const specificBlog = await Blog.findById(request_id)

    response.status(200).json(specificBlog)
})




blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user
    if (user === undefined) {
        return response.status(400).json({ error: 'Invalid token' })
    }

    const blog = new Blog({
        ...(body._id ? { _id: body._id } : {}),
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
        likes: body.likes,

    })



    try {
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()


        response.status(201).json(result)
    } catch (error) {
        response.status(400).json(error)
    }

})


blogsRouter.delete('/:id', async (request, response) => {
    const request_id = String(request.params.id)

    if (!request_id.match(/^[0-9a-fA-F]{24}$/)) {
        return response.status(400).json({ error: 'invalid blog id format' })
    }
    //Retrieve the blog based on given id and check against provided auth token to see if requester is the author of the blog
    const requesterUser = request.user
    const blogToDelete = await Blog.findById(request_id)

    if (blogToDelete === null) { //
        return response.status(400).json({ error: 'invalid blog id' })
    }
    if (requesterUser === null) {
        return response.status(500).json({ error: 'Something went wrong' })
    }



    if (blogToDelete.user.toString() === requesterUser._id.toString()) {
        try {
            const result = await Blog.findByIdAndDelete(request_id)
            response.status(204).json(result)

        } catch (error) {
            response.status(500).json(error)

        }
    }

    else {
        response.status(401).json({ error: 'You\'re not the author of this blog, hence you cannot delete this blog' })
    }


})

blogsRouter.put('/:id', async (request, response) => {
    const request_id = String(request.params.id)
    const body = request.body
    if (!request_id.match(/^[0-9a-fA-F]{24}$/)) {
        return response.status(400).json({ error: 'invalid blog id format' })
    }
    // const updatedBlog = {
    //     title: body.title,
    //     author: body.author,
    //     url: body.url,
    //     likes: body.likes
    // }
    const updatedBlog = {
        //...(request.body.user === undefined ? {} : { title: request.body.user.id }),
        ...(request.body.user === undefined ? {} : { user: request.body.user }),
        ...(request.body.title === undefined ? {} : { title: request.body.title }),
        ...(request.body.author === undefined ? {} : { author: request.body.author }),
        ...(request.body.url === undefined ? {} : { url: request.body.url }),
        ...(request.body.likes === undefined ? {} : { likes: request.body.likes }),

    }

    try {
        const result = await Blog.findByIdAndUpdate(request_id, updatedBlog, { new: true })
        response.status(200).json(result)
    } catch (error) {
        response.status(400).json(error)
    }

})


blogsRouter.put('/:id/comments', async (request, response) => {
    const request_id = String(request.params.id)
    const body = request.body


    if (!request_id.match(/^[0-9a-fA-F]{24}$/)) {
        return response.status(400).json({ error: 'invalid blog id format' })
    }

    try {
        const existingBlog = await Blog.findById(request_id)
        const blogWithNewComment = {
            ...existingBlog.toObject(),
            'comments': [...existingBlog.comments, body.comments]
        }
        const result = await Blog.findByIdAndUpdate(request_id, blogWithNewComment, { new: true })
        response.status(200).json(result)

    }
    catch (error) {
        response.status(400).json(error)
    }

})


module.exports = blogsRouter