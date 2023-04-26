import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const BlogSummary = () => {
    const blogs = useSelector(state => state.blog)
    let sortableBlogs = [...blogs];

    const blogStyle = {
        border: 'solid',
        borderWidth: 1,
    }


    return (
        <div>
            {sortableBlogs
                .sort((a, b) => {
                    return b.likes - a.likes;
                })
                .map((blog) => (
                    <div className="summaryView m-3 p-3 shadow bg-body rounded" key={'blogSummary_' + blog.id}>
                        <Link className="text-decoration-none" to={`/blogs/${blog.id}`}>
                            {blog.title} <br/> 
                        </Link>
                        {blog.author}
                    </div>
                ))}



        </div>

    )
}

export default BlogSummary