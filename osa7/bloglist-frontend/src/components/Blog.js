
import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, initializeBlogs, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Container, Divider, Grid } from 'semantic-ui-react'

const Blog = (props) => {
    if(props.blog === undefined) {
        return null
    }
    console.log(props.blog)
    const blog = props.blog
    console.log(blog)
    const handleLike = (id) => {
        const liked = props.blogsToShow.find(a => a.id === id)
        props.likeBlog(liked)
    }

    const deleteBlog = async (id) => {
        const deleted = props.blogsToShow.find(a => a.id === id)
        await props.deleteBlog(deleted, props.user)
        await props.initializeBlogs()
        props.setNotification(`${deleted.title} removed`, 5)
    }

    return (
        <div className='blog'>
            <div>
                <Container as='h2' textAlign='center'>{blog.title} {blog.author}</Container>
                <Divider />
                <Grid columns={4} divided>
                    <Grid.Column>
                        <a href={blog.url}>{blog.url}</a>
                    </Grid.Column>
                    <Grid.Column>
                        {blog.likes}
                        <button onClick={() => handleLike(blog.id)}>like</button>
                    </Grid.Column>
                    <Grid.Column>
                        {blog.user.name}
                    </Grid.Column>
                    {props.user.username === blog.user.username &&(
                        <Grid.Column><button onClick={() => deleteBlog(blog.id)}>delete</button></Grid.Column>)}
                </Grid>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    const blogsToShow = state.blogs
    const user = state.login

    return {
        blogsToShow,
        user
    }
}

export default connect(mapStateToProps, {
    likeBlog, setNotification, deleteBlog, initializeBlogs
})(Blog)