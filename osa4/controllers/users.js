const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        if (!body.password) {
            return response.status(400).json({ error: 'password missing '})
        }
        if (body.password.length < 3) {
            return response.status(400).json({ error: 'password too short' })
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            passwordHash: passwordHash,
            name: body.name
        })

        const savedUser = await user.save()
        response.json(savedUser)

    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter