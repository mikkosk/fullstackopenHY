import React from 'react'
import { List } from 'semantic-ui-react'


const User = (user) => {
    if (user.user === undefined) {
        return null
    }

    return (
        <div>
            <h2>{user.user.name}</h2>
            <h3>added blogs</h3>
            <div>
                <List>
                    {user.user.blogs.map(blog =>
                        <List.Item key={blog.id}>{blog.title}</List.Item>
                    )}
                </List>
            </div>
        </div>
    )
}


export default User