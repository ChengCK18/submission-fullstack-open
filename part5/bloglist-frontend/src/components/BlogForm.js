import React from 'react'


const BlogForm = ({ blogTitle,
    setBlogTitle,
    blogAuthor,
    setBlogAuthor,
    blogUrl,
    setBlogUrl,
    handleCreateBlog,
    handleCancelBlog }) => {



    return (

        <form onSubmit={handleCreateBlog}>

            <div>
                Title: <input type="text"
                    id='new_blog_title_input'
                    value={blogTitle}
                    name="blogTitle"
                    placeholder='input blog title here'
                    onChange={({ target }) => { setBlogTitle(target.value) }} />
            </div>
            <div>
                Author: <input type='text'
                    id='new_blog_author_input'
                    value={blogAuthor}
                    name='blogAuthor'
                    placeholder='input blog author here'
                    onChange={({ target }) => { setBlogAuthor(target.value) }} />
            </div>

            <div>
                URL: <input type='text'
                    id='new_blog_url_input'
                    value={blogUrl}
                    name='blogUrl'
                    placeholder='input blog url here'
                    onChange={({ target }) => { setBlogUrl(target.value) }} />
            </div>

            <button type='submit' id='create_new_blog_button'>Create</button>
            <button type='button' id='cancel_new_blog_button' onClick={handleCancelBlog}>Cancel</button>
        </form>
    )


}




export default BlogForm