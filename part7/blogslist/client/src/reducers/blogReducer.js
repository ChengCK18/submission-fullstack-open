import { createSlice } from '@reduxjs/toolkit';
import { showNotification } from './notificationReducer';
import blogService from '../services/blogs';

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
    }
});

export const initializeBlogs = (user) => {
    return async (dispatch) => {
        if (user !== null) {
            const blogs = await blogService.getAll({ user });
            dispatch(setBlogs(blogs));
        }
        else {
            showNotification(
                'error',
                `You're not logged in`,
                5
            )
        }

    };
};

export const blogCreation = (user, blogTitle, blogAuthor, blogUrl) => {
    return async (dispatch) => {
        try {
            await blogService.createBlog({
                user,
                blogTitle,
                blogAuthor,
                blogUrl
            });
            dispatch(
                showNotification(
                    'success',
                    `${blogTitle} by ${blogAuthor} has been added`,
                    5
                )
            );

            dispatch(initializeBlogs(user));
        } catch (error) {
            dispatch(showNotification('error', 'bakkk', 5));
        }
    }
}


export const blogComment = (user, blogId, userComment) => {
    return async (dispatch) => {

        await blogService.commentBlog({ user, blogId, userComment })


        dispatch(initializeBlogs(user));
        dispatch(
            showNotification(
                'success',
                `Your comment has been added to this blog`,
                5
            )
        );
    }
}


export const blogDeletion = (user, blogIdArg) => {
    return async (dispatch) => {
        await blogService.deleteBlog({ user: user, blogId: blogIdArg });
        dispatch(initializeBlogs(user)) // To update blog lists after deletion
    }
}

export const blogLikeAdditon = (user, blogIdArg, blogTitleArg, blogAuthorArg, blogUrlArg, blogLikeArg) => {
    return async (dispatch) => {
        await blogService.likeFunc({
            user: user,
            blogId: blogIdArg,
            blogTitle: blogTitleArg,
            blogAuthor: blogAuthorArg,
            blogUrl: blogUrlArg,
            blogLike: blogLikeArg + 1
        });
        dispatch(initializeBlogs(user)) // To update blog lists after new like
    }
}




export default blogSlice.reducer;

export const { setBlogs } = blogSlice.actions;