const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
    

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        "title": body.title,
        "author": body.author,
        "url": body.url,
        "likes": body.likes || 0,
        "user": user.id
    })
  
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.json(savedBlog.toJSON())
    
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try{
        
        decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)

        console.log(user.id.toString())
        console.log(blog.user.toString())
        
        if ( user.id.toString() === blog.user.toString() ) {
            await Blog.findByIdAndRemove(request.params.id)
            return (
            response.status(204).end()
            )
        } else {
            return (
            response.status(401).json({ error: 'wrong id' })
            )
        }

    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
        response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter