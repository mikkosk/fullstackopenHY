import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, initializeBlogs, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Table } from 'semantic-ui-react'
import {
    Link
} from 'react-router-dom'

const BlogList = (props) => {
    return (
        <div>
            <Table striped celled>
                <Table.Body>
                    {props.blogsToShow.sort((a1, a2) => a2.likes - a1.likes).map(blog =>
                        <Table.Row key={blog.id}>
                            <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Table.Cell>
                            <Table.Cell>{blog.author}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
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
    likeBlog, initializeBlogs, setNotification, deleteBlog
})(BlogList)