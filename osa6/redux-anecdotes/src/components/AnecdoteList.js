import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    console.log(props.notifications)

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        const notificationText = `you voted '${anecdote.content}'` 
        props.createNotification(notificationText, 1)
        props.voteAnecdote(anecdote.id)
      }

      return (
        <div>
            {props.visibleAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
      )
}

const anecdotesToShow = ({anecdotes, filter}) => {
        const anecdotesNotSorted = filter.filter.length === 0
        ? anecdotes
        : anecdotes.filter(
            a => a.content.toLowerCase().includes(filter.filter.toString().toLowerCase())
        )
        const anecdotesSorted = anecdotesNotSorted.sort((a,b) => b.votes - a.votes)
        return anecdotesSorted
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state),
    }
}

const mapDispatchToProps = {
        voteAnecdote,
        createNotification,
        removeNotification,

}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)

export default ConnectedAnecdoteList