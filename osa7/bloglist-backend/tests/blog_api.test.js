const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('GET returns json', async () => {
    await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)
})

test('GET returns right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('returned blogs have field id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
})

test('succesful POST increases number of blogs by one', async () => {
    const newBlog = {
        title: 'uusi',
        author: 'kirjailija',
        url: 'www',
        likes: 13
    }

    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
})

test('POST without likes-field sets likes to 0', async () => {
    const newBlog = {
        title: 'uusi',
        author: 'kirjailija',
        url: 'www'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')
    expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('initial blog without likes-field returns 0 likes', async () => {
    const blogWithoutLikes = new Blog(
        {
            title: 'uusi',
            author: 'kirjailija',
            url: 'www' 
        }
    )
    await blogWithoutLikes.save()

    const response = await api.get('/api/blogs')
    expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('posting without title returns 400 bad request', async () => {
    const newBlog = {
        author: 'kirjailija',
        url: 'ok',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('posting without url returns 400 bad request', async () => {
    const newBlog = {
        title: 'kirjoitus',
        author: 'kirjailija',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})