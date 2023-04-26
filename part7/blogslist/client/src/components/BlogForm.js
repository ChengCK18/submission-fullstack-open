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

        <form className='m-3' onSubmit={handleCreateBlog}>

            <div>
                Title<br/><input type="text"
                    id='new_blog_title_input'
                    value={blogTitle}
                    name="blogTitle"
                    placeholder='Enter blog title here'
                    onChange={({ target }) => { setBlogTitle(target.value) }} />
            </div>
            <div>
                Author<br/><input type='text'
                    id='new_blog_author_input'
                    value={blogAuthor}
                    name='blogAuthor'
                    placeholder='Enter blog author here'
                    onChange={({ target }) => { setBlogAuthor(target.value) }} />
            </div>

            <div>
                URL<br/><input type='text'
                    id='new_blog_url_input'
                    value={blogUrl}
                    name='blogUrl'
                    placeholder='Enter blog url here'
                    onChange={({ target }) => { setBlogUrl(target.value) }} />
            </div>

            <button className='btn btn-primary mt-2' type='submit' id='create_new_blog_button'>Create</button>
            <button className='btn btn-danger mt-2 ms-2' type='button' id='cancel_new_blog_button' onClick={handleCancelBlog}>Cancel</button>
        </form>
    )


}




export default BlogForm