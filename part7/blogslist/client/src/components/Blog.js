import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { blogComment } from '../reducers/blogReducer';
import Notification from './Notification';

const Blog = ({ blog, user, handleAddLike, handleDeleteBlog }) => {
    const dispatch = useDispatch()
    const notificationMsg = useSelector(state => state.notification)

  

    const [userComment, setUserComment] = useState('')

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
        return (<button className='ms-2 btn btn-danger' type='button' onClick={deleteBlog}>Delete</button>)
    }

    const handleCommentChange = (event) => {
        setUserComment(event.target.value)
    }

    const handlePostComment = () => {
        dispatch(blogComment(user, blog.id, userComment))
        setUserComment('')

    }

    return (
        <div  className='detailedView'>
            <h1>{blog.title} <b>by</b> {blog.author}</h1>
            <table className="table ">
                <tbody >
                    <tr>
                        <td className='bg-secondary'>URL</td>
                        <td>{blog.url}</td>
                    </tr>
                    <tr>
                        <td className='bg-secondary'>Likes</td>
                        <td>{blog.likes}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='bg-secondary'>Author</td>
                        <td>{blog.user.name}</td>
                    </tr>
              
                    
                       
                    
                </tbody>
            </table>
            <div className="d-flex flex-row">
                            <button className='ms-2 btn btn-success' type='button' onClick={addLike}>Like</button>
                            {blog.user.username === user.username ? showDeleteButton() : null}
                        </div>
            <Notification message={notificationMsg} />
            <div className='mt-5'>
                <h3 className='m-2'>Comments</h3>
                <input className='m-2' type="text"
                    id='blog_comment_input'
                    value={userComment}
                    name="blogComment"
                    placeholder='Comment here'
                    onChange={handleCommentChange}
                />
                <button className='btn btn-success ' onClick={handlePostComment}>Post</button>
            </div>

            
            <ul className='m-2 list-group '>
                {blog.comments.map((comment, index) => <li className='list-group-item' key={blog.id + '_cmt' + index}>{comment}</li>)}
            </ul>
        </div>
    )

}




export default Blog