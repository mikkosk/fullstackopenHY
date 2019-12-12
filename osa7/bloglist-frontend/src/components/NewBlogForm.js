import React from 'react'
import { connect } from 'react-redux'
import { createBlog, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { Button, Form } from 'semantic-ui-react'



const NewBlogForm = (props) => {

    const [title, resetTitle] = useField('text')
    const [author, resetAuthor] = useField('text')
    const [url, resetUrl] = useField('text')

    const handleCreate = async (event) => {
        event.preventDefault()
        props.NewBlogFormRef.current.toggleVisibility()
        const blog = {
            title: title.value,
            author: author.value,
            url: url.value
        }
        resetTitle()
        resetAuthor()
        resetUrl()
        await props.createBlog(blog, props.user)
        await props.initializeBlogs()
        props.setNotification(`blog ${blog.title} by ${blog.author} created`, 5)

    }

    return (
        <div>
            <h2>Create a new blog</h2>
            <Form onSubmit={handleCreate}>
                <Form.Field>
                    <label>Title:</label>
                    <input {...title}/>
                </Form.Field>
                <Form.Field>
                    <label>Author:</label>
                    <input {...author}/>
                </Form.Field>
                <Form.Field>
                    <label>Url:</label>
                    <input {...url}/>
                </Form.Field>
                <Button type='submit'>create</Button>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => {
    const user = state.login

    return {
        user
    }
}

export default connect(mapStateToProps, { setNotification, initializeBlogs, createBlog })(NewBlogForm)