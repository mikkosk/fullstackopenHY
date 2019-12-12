import React from 'react'
import { connect } from 'react-redux'
import BlogList from '../components/BlogList'
import Login from '../components/Login'
import Notification from '../components/Notification'
import '../index.css'
import NewBlogForm from '../components/NewBlogForm'
import Togglable from '../components/Togglable'
import { initializeBlogs } from '../reducers/blogReducer'
import { initializeUser } from '../reducers/loginReducer'

const Home = (props) => {

    const NewBlogFormRef = React.createRef()
    if (!props.user.token) {
        return (
            <div>
                <Notification/>
                <h1>log in to application</h1>
                <Login />
            </div>
        )
    }

    return (
        <div>
            <Notification/>
            <h2>Blogs</h2>
            <Togglable buttonLabel='create new' ref={NewBlogFormRef}>
                <NewBlogForm NewBlogFormRef={NewBlogFormRef}/>
            </Togglable>
            <BlogList />
        </div>
    )
}

const mapToStateProps = (state) => {
    return {
        user: state.login,
    }
}

export default connect(mapToStateProps, { initializeBlogs, initializeUser })(Home)