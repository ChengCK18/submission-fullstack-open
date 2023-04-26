import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = ({ user }) => {
    const config = {
        headers: { Authorization: `bearer ${user.token}` }
    };
    const request = axios.get(baseUrl, config);

    return request.then((response) => {
        return response.data;
    });
};

const createBlog = ({ user, blogTitle, blogAuthor, blogUrl }) => {
    const config = {
        headers: {
            Authorization: `bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    };
    const content = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
    };

    const request = axios.post(baseUrl, content, config);

    return request.then((response) => {
        return response.data;
    });
};

const likeFunc = ({
    user,
    blogId,
    blogTitle,
    blogAuthor,
    blogUrl,
    blogLike
}) => {
    const config = {
        headers: { Authorization: `bearer ${user.token}` }
    };

    const content = {
        user: user.id,
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        likes: blogLike
    };

    const blogIdUrl = baseUrl + '/' + blogId;
    const request = axios.put(blogIdUrl, content, config);

    return request.then((response) => {

        return response.data;
    });
};

const deleteBlog = ({ user, blogId }) => {
    const config = {
        headers: { Authorization: `bearer ${user.token}` }
    };

    const blogIdUrl = baseUrl + '/' + blogId;
    const request = axios.delete(blogIdUrl, config);

    return request.then((response) => {

        return response.data;
    });
};


const commentBlog = ({ user, blogId, userComment }) => {
    const config = {
        headers: { Authorization: `bearer ${user.token}` }
    };

    const content = {
        'comments': userComment
    };
    const blogIdUrl = baseUrl + '/' + blogId + '/comments';
    const request = axios.put(blogIdUrl, content, config)
    return request.then((response) => {
        return response.data;
    });

}

const blogServices = {
    getAll,
    createBlog,
    likeFunc,
    deleteBlog,
    commentBlog
}

export default blogServices;
