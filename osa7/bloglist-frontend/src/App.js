import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Logout from './components/Logout'
import './index.css'
import Users from './components/Users'
import User from './components/User'
import Home from './components/Home'
import Blog from './components/Blog'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers, getUserById } from './reducers/userReducer'
import { Container, Menu } from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom'

const App = (props) => {

    const initializeBlogs = props.initializeBlogs
    const initializeUser = props.initializeUser
    const initializeUsers = props.initializeUsers

    useEffect(() => {
        initializeBlogs()
    }, [initializeBlogs])

    useEffect(() => {
        initializeUser()
    }, [initializeUser])

    useEffect(() => {
        initializeUsers()
    }, [initializeUsers])

    return(
        <Container>
            <div>
                <Router>
                    <div>
                        <div>
                            <Menu widths='3'>
                                <Menu.Item>
                                    <Link to="/">blogs</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to="/users">users</Link>
                                </Menu.Item>
                                {props.user.name
                                    ? <Menu.Item> {props.user.name} logged in  <Logout/> </Menu.Item>
                                    : <Menu.Item> <Link to="/">login </Link></Menu.Item>
                                }
                            </Menu>
                        </div>
                        <Route exact path="/" render={() => <Home />} />
                        <Route exact path="/users" render={() => <Users />} />
                        <Route exact path="/users/:id" render={({ match }) =>
                            <User user={props.users.find(u => u.id === match.params.id)} />
                        } />
                        <Route exact path="/blogs/:id" render={({ match }) =>
                            <Blog blog={props.blogs.find(u => u.id === match.params.id)} />
                        } />
                    </div>
                </Router>
            </div>
        </Container>
    )

}

const mapToStateProps = (state) => {
    return {
        user: state.login,
        users: state.users,
        blogs: state.blogs
    }
}

export default connect(mapToStateProps, { setNotification, initializeBlogs, initializeUser, initializeUsers, getUserById })(App)
