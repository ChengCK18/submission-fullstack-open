const Blog = require('../models/blog')


const initialBlogs = [{
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
},
{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
},
{
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
}
]


const newBlog = {
    title: 'Peanuts',
    author: 'Anya',
    url: 'https://animecorner.me/wp-content/uploads/2022/05/Spy-x-family-06-31.png',
    likes: 5
}

const newBlogWithoutLikes = {
    title: 'Peanuts',
    author: 'Anya',
    url: 'https://animecorner.me/wp-content/uploads/2022/05/Spy-x-family-06-31.png',
}


const newBlogWithoutTitleAndUrl = {
    author: 'Anya',
    likes: 5
}

const updatedNote = {
    title: 'Peanutsssssss',
    likes: 100
}



const allBlogsInDb = async () => {
    const notes = await Blog.find({})
    return notes.map(note => note.toJSON())
}


module.exports = {
    initialBlogs, newBlog, newBlogWithoutLikes, newBlogWithoutTitleAndUrl, updatedNote, allBlogsInDb
}