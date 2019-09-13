import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleChange, handleRemove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [extended, setExtended] = useState(false)

  const userMatchesBlog = blog.user.username === user.username

  const showDelete = { display: userMatchesBlog ? '' : 'none' }
  const hideWhenExtended = { display: extended ? 'none' : '' }
  const showWhenExtended = { display: extended ? '' : 'none' }

  const toggleExtension = () => {
    setExtended(!extended)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div style={hideWhenExtended} onClick={toggleExtension}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenExtended}>
        <div onClick={toggleExtension} data-testid="ok">
          {blog.title} {blog.author}
        </div>
        {blog.url}
        <br></br>{blog.likes}
        <button onClick={() => handleChange(blog)}>like</button>
        <br></br>{blog.user.name}
        <div style={showDelete}>
          <button onClick={() => handleRemove(blog)}>delete</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired

}

export default Blog