import React from 'react'
import PropTypes from 'prop-types'
const NewBlogForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <form onSubmit={ onSubmit }>
        <div>
          <h2>Create a new blog</h2>
          <div>
                    Title:
            <input
              type='text'
              value={value.title}
              name='title:'
              onChange={({ target }) => handleChange({ ...value, title: target.value })}
            />
          </div>
          <div>
                    Author:
            <input
              type='text'
              value={value.author}
              name='author:'
              onChange={({ target }) => handleChange({ ...value, author: target.value })}
            />
          </div>
          <div>
                    Url:
            <input
              type='text'
              value={value.url}
              name='url:'
              onChange={({ target }) => handleChange({ ...value, url: target.value })}
            />
          </div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired

}
export default NewBlogForm