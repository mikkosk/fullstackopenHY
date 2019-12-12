import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    const byLikes = (a1, a2) => a2.likes - a1.likes
    if(action.type === 'CREATE_BLOG') {
        return state.concat(action.data).sort(byLikes)
    } else if (action.type === 'DELETE_BLOG') {
        return state.filter(a => a.id !== action.data.id)
    } else if (action.type === 'LIKE') {
        return state.map(a => a.id !== action.data.id ? a : action.data)
    } else if (action.type === 'INITIALIZE') {
        return action.data
    }
    return state
}

export const createBlog = (content, user) => {
    return async dispatch => {
        const blog = {
            ...content,
            likes: 0
        }
        blogService.setToken(user.token)
        const newBlog = await blogService.create(blog, user.token)
        dispatch({
            data: newBlog,
            type: 'CREATE_BLOG'
        })
    }
}

export const deleteBlog = (blog, user) => {
    return async dispatch => {
        blogService.setToken(user.token)
        const data = await blogService.remove(blog, user.token)
        dispatch({
            data,
            type: 'DELETE_BLOG'
        })
    }
}
export const initializeBlogs = () => {
    return async dispatch => {
        const data = await blogService.getAll()
        dispatch({
            data,
            type: 'INITIALIZE'
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const data = await blogService.like(blog)
        dispatch({
            data,
            type: 'LIKE'
        })
    }
}

export default blogReducer