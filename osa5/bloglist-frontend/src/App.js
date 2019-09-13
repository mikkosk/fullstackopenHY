import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import './index.css'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {
  const username = useField('text')
  const password = useField('text')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [changed, setChanged] = useState(true)

  const NewBlogFormRef = React.createRef()

  useEffect(() => {
    blogsService.getAll().then(intialBlogs => { setBlogs(intialBlogs)})
  }, [changed])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const loginUser = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loginUser)
      )

      blogsService.setToken(loginUser.token)
      setUser(loginUser)
      setNotification(`${loginUser.name} logged in`)
      username.reset.reset()
      password.reset.reset()
      setTimeout(() => {
        setNotification(null)
      }, 5000)


    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setNotification('logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleNewPost = async (event) => {
    event.preventDefault()
    NewBlogFormRef.current.toggleVisibility()
    blogsService.setToken(user.token)
    try {
      await blogsService.create({
        title: blog.title,
        author: blog.author,
        url: blog.url
      }, user.token)

      setBlog({ title: '',
        author: '',
        url: '' })
      setChanged(!changed)
      setNotification(`Blog titled ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('bad request')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    try {
      await blogsService.like(blog)
      setChanged(!changed)
    } catch (exception) {
      setErrorMessage('like did not register')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    try {
      blogsService.setToken(user.token)
      await blogsService.remove(blog, user.token)
      setChanged(!changed)
    } catch (exception) {
      setErrorMessage('wrong user')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        <Error message={errorMessage} />
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
              username
            <input
              {...username}
            />
          </div>
          <div>
              password
            <input
              {...password}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Error message={errorMessage} />
      <Notification message={notification} />
      <form onSubmit={ handleLogout }>
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in
            <button type='submit'>logout</button>
          </p>
        </div>
      </form>
      <Togglable buttonLabel='new note' ref={NewBlogFormRef}>
        <NewBlogForm
          onSubmit={handleNewPost}
          value={blog}
          handleChange={setBlog}
        />
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleChange={handleLike} handleRemove={handleDelete} user={user}/>)}
    </div>
  )
}

export default App
