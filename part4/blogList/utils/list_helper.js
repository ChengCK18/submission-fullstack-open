var _ = require('lodash')




const totalLikes = (blogs) => {
    const reducer = (sumLikes, blog) => {
        return sumLikes + blog.likes
    }
    return blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
    let maxLikes = -1
    let mostLikedPost = ''
    blogs.forEach((blog) => {
        if (blog.likes > maxLikes) {
            mostLikedPost = blog
            maxLikes = blog.likes
        }

    })
    if (maxLikes == -1) {
        return null
    }
    else {
        const temp_blog = {
            'title': mostLikedPost.title,
            'author': mostLikedPost.author,
            'likes': mostLikedPost.likes
        }
        return temp_blog
    }
}

const mostBlogs = (blogs) => {

    var result = _.countBy(blogs, 'author')
    var max_author = _.max(Object.keys(result), function (o) { return result[o] })

    return {
        'author': max_author,
        'blogs': result[max_author]
    }

}



const mostLikes = (blogs) => {

    const result = _(blogs).groupBy('author').map((blog, author) => ({
        author: author,
        likes: _.sumBy(blog, 'likes')
    }))
        .value()

    return _.maxBy(result, 'likes')

}


module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}