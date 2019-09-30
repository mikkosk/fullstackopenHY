import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        const notificationText = `you posted '${event.target.anecdote.value}'` 
        props.createNotification(notificationText, 1)
        props.createAnecdote(event.target.anecdote.value)
        event.target.anecdote.value = ''
      }

    return (
        <div>
            <h2>create new</h2>
                <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
                </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notifications: state.notifications
    }
}

const mapDispatchToProps = {
        createNotification,
        removeNotification,
        createAnecdote
}

const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteForm)

export default ConnectedAnecdoteForm

