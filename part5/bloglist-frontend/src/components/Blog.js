import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, user, handleAddLike, handleDeleteBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 25
    }
    const addLike = () => { //Better solution would be backend take list of objectid of users that liked and count them. To check and avoid multiple likes from same user

        handleAddLike({
            blogIdArg: blog.id,
            blogTitleArg: blog.title,
            blogAuthorArg: blog.author,
            blogUrlArg: blog.url,
            blogLikeArg: blog.likes

        })

    }

    const deleteBlog = () => {
        if (window.confirm(`Remove blog - ${blog.title} by ${blog.author}`)) {
            handleDeleteBlog(blog.id)
        }
    }
    const showDeleteButton = () => {
        return (<p><button style={{ backgroundColor: 'red' }} type='button' onClick={deleteBlog}>Delete</button></p>)
    }

    const summaryView = () => {
        return (
            <div style={blogStyle} className='summaryView'>
                {blog.title} <b>by</b> {blog.author}
            </div>
        )
    }

    const detailedView = () => {
        return (

            <div style={blogStyle} className='detailedView'>

                {blog.title} <b>by</b> {blog.author}
                <p>URL {'=>'} {blog.url}</p>
                <p>Likes {'=>'} {blog.likes} <button type='button' onClick={addLike}>Like</button></p>
                <p>{blog.user.name}</p>

                {blog.user.username === user.username ? showDeleteButton() : null}
            </div>
        )

    }

    return (
        <div>
            <Togglable buttonLabel='View' buttonLabelHide='Hide'>
                {summaryView()}
                {detailedView()}
            </Togglable>
        </div>
    )

}




export default Blog