const blogs = [
    {
        title: 'testi',
        author: 'testaaja',
        likes: 0,
        url: 'ok',
        user: {
            username:'username',
            name:'name'
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll }