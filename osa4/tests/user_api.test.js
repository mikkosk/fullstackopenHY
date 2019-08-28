const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

test('post without password wont create a users and returns 400', async () => {
    const newUser = {
        username: 'testi',
        name: 'Testaaja'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(undefined)
})

test('post with too short password wont create a users and returns 400', async () => {
    const newUser = {
        username: 'testi',
        password: 'ok',
        name: 'Testaaja'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(undefined)
})

test('post without username wont create a users and returns 400', async () => {
    const newUser = {
        password: 'ok123',
        name: 'Testaaja'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(undefined)
})

test('post with too short username wont create a users and returns 400', async () => {
    const newUser = {
        username: 'te',
        password: 'ok123',
        name: 'Testaaja'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(undefined)
})

test('post without unique username wont create a users and returns 400', async () => {
    const duplicateUser = new User({
        username: 'testi',
        password: 'ok123',
        name: 'Testaaja'
    })

    await duplicateUser.save()
    
    const newUser = {
        username: 'testi',
        password: 'ok123',
        name: 'Testaaja'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(undefined)
})

afterAll(() => {
    mongoose.connection.close()
})