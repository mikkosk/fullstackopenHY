import React, { useState } from 'react'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        const result = await props.login({variables: { username, password }})

        if (result) {
            const token = result.data.login.value
            console.log(token)
            props.setToken(token)
            localStorage.setItem('user-token', token)
        }
        setUsername('')
        setPassword('')

    }
    
    return (
        <form onSubmit={submit}>
        <div>
        name
        <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
        />
        </div>
        <div>
        password
        <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
        />
        </div>
        <button type="submit">login</button>
    </form>
    )
}

export default Login