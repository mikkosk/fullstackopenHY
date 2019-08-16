import React from 'react'

const Notification = ({message, errorMessage}) => {
    if (message === null && errorMessage === null) {
        return null
    }

    if (errorMessage === null) {
        return (
            <div className="notification">
                {message}
            </div>
        )
    }

    if (message === null) {
        return (
            <div className="error">
                {errorMessage}
            </div>
        )
    }
}

export default Notification