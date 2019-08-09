import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(votes)

  const handleVoteClick = () => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
        console.log(points[selected], 'kasvatettu yhdellä') 
    }


  return (
    <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <p>has {points[selected]} votes</p>
        <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
        text="next anecdote" />
        <Button handleClick={(handleVoteClick)}
        text="vote" />
        <p></p>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostVotes(points)]}</p>
        <p>has {points[mostVotes(points)]} votes</p>
    </div>
  )
}

const Button = ( {handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )

}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const votes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)

function mostVotes(list) {
    let most = 0
    console.log(list)
    let pituus = list.length
    for (let i = 0; i < pituus; i++) {
        if (list[i] > list[most]) {
            most = i
        }
    }
    return (most)
}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)