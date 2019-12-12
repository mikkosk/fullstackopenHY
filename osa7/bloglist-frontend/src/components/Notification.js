import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    if (props.notification.length === 0) {
        return null
    }

    return (<div className='notification'>{props.notification}</div>)
}

const mapStateToProps = (state) => ({
    notification: state.notification
})

export default connect(mapStateToProps)(Notification)