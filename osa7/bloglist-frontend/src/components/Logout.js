import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'semantic-ui-react'

const Logout = (props) => {

    const handleLogout = () => {
        props.logout()
        setNotification('logout', 5)
    }

    return (
        <form onSubmit={ handleLogout }>
            <Button type='submit'>logout</Button>
        </form>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.login
    }
}

export default connect(mapStateToProps, { logout, setNotification } )(Logout)