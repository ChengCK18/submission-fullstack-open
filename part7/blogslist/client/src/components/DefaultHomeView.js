import Notification from "./Notification"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import BlogSummary from "./BlogSummary"
import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { blogCreation } from "../reducers/blogReducer"
import { initializeBlogs } from "../reducers/blogReducer"
const DefaultHomeView = () => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogUrl, setBlogUrl] = useState('');

    const notificationMsg = useSelector(state => state.notification)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const blogToggleRef = useRef();


    useEffect(() => {
        dispatch(initializeBlogs(user));
    }, [user, dispatch])



    const handleCreateBlog = async (event) => {
        event.preventDefault();
        blogToggleRef.current.toggleVisibility();
        dispatch(blogCreation(user, blogTitle, blogAuthor, blogUrl))
    };

    const handleCancelBlog = () => {
        blogToggleRef.current.toggleVisibility();
    };


    return (
        <div>
            <h2 className="text-center p-3">Blogs</h2>

            <Notification message={notificationMsg} />
            <Togglable
                buttonLabel="Create new blog"
                buttonLabelHide="Create new blog"
                ref={blogToggleRef}
            >
                <BlogForm
                    blogTitle={blogTitle}
                    setBlogTitle={setBlogTitle}
                    blogAuthor={blogAuthor}
                    setBlogAuthor={setBlogAuthor}
                    blogUrl={blogUrl}
                    setBlogUrl={setBlogUrl}
                    handleCreateBlog={handleCreateBlog}
                    handleCancelBlog={handleCancelBlog}
                />
            </Togglable>
            <BlogSummary />
        </div>
    )

}

export default DefaultHomeView