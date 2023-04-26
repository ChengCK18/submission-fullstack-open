import Blog from "./Blog"
import { useSelector, useDispatch } from "react-redux"
import { initializeBlogs, blogLikeAdditon, blogDeletion } from "../reducers/blogReducer"
import { useNavigate } from 'react-router-dom';
import { showNotification } from "../reducers/notificationReducer";

const BlogSpecific = ({ match }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blog)

    const specificBlog = match
        ? blogs.find(blog => blog.id === match.params.id)
        : null


    const updateBlogsData = () => {
        dispatch(initializeBlogs(user));
    };

    const handleAddLike = async ({
        blogIdArg,
        blogTitleArg,
        blogAuthorArg,
        blogUrlArg,
        blogLikeArg
    }) => {
        dispatch(blogLikeAdditon(user, blogIdArg, blogTitleArg, blogAuthorArg, blogUrlArg, blogLikeArg))
    };

    const handleDeleteBlog = async (blogIdArg) => {
        dispatch(blogDeletion(user, blogIdArg))
        const notificationMessage = `Blog successfully removed`
        dispatch(showNotification('success', notificationMessage, 5))
        navigate('/')
        
    };


    if (specificBlog !== null && specificBlog !== undefined) {
        return (
            <Blog
                key={specificBlog.id}
                blog={specificBlog}
                user={user}
                updateBlogsData={updateBlogsData}
                handleAddLike={handleAddLike}
                handleDeleteBlog={handleDeleteBlog}
            />
        )
    }
    return ('')
}


export default BlogSpecific