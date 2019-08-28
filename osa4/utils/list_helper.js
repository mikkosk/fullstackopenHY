const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const blogsLikes = blogs.map(blog => blog.likes)
    console.log(blogsLikes)
    const reducer = (accumalator, currentValue) => {
         return accumalator + currentValue
    }
    return blogsLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 'no blogs found'
    }

    else {
        return blogs.sort((a,b) => b.likes-a.likes)[0]
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 'no blogs found'
    }

    else {
        let mostBlogs = 0
        let mostAuthor = null
        let blogsAmount = 0
        let author = null

        blogs.sort().forEach(blog => {
            if (blog.author === author) {
                blogsAmount = blogsAmount + 1

                if (blogsAmount > mostBlogs) {
                    mostAuthor = author
                    mostBlogs = blogsAmount
                }
            }
            else {
                author = blog.author
                blogsAmount = 1

                if (blogsAmount > mostBlogs) {
                    mostAuthor = author
                    mostBlogs = blogsAmount
                }
            }
        })
    
        return {
            author: mostAuthor,
            blogs: mostBlogs
            
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return 'no blogs found'
    }

    else {
        let mostLikes = 0
        let mostAuthor = null
        let likes = 0
        let author = null

        blogs.sort().forEach(blog => {
            if (blog.author === author) {
                likes = likes + blog.likes

                if (likes > mostLikes) {
                    mostAuthor = author
                    mostLikes = likes
                }
            }
            else {
                author = blog.author
                likes = blog.likes

                if (likes > mostLikes) {
                    mostAuthor = author
                    mostLikes = likes
                }
            }


        })
        
        return {
            author: mostAuthor,
            likes: mostLikes
            
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

