import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'semantic-ui-react'

const Login = (props) => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            setUsername('')
            setPassword('')
            await props.login(username, password)
            props.setNotification(`logged in ${username}`, 5)

        } catch {
            props.setNotification('wrong credentials', 5)
        }
    }


    return(
        <Form onSubmit={handleLogin}>
            <Form.Field>
                <label>username</label>
                <input onChange={handleUsername} />
            </Form.Field>
            <Form.Field>
                <label>password</label>
                <input onChange={handlePassword} />
            </Form.Field>
            <Button type='submit'>login</Button>
        </Form>)
}

const MapStateToProps = (state) => {
    return {
        user: state.login
    }
}

export default connect(MapStateToProps, { login, setNotification })(Login)