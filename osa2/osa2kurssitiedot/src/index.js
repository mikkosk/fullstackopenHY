import React from 'react'
import ReactDOM from 'react-dom'
import Course from './hakemisto/Course'

const App = () => {
  const courses =  [
    {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {    
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Testausta',
                exercises: 30,
                id: 4
            }

        ]
    },
    {
        name: 'Historian alkeet',
        id: 2,
        parts: [
            {
                name: 'Antiikki',
                exercises: 3,
                id: 1
            },
            {
                name: 'Keskiaika',
                exercises: 5,
                id: 2
            }
        ]
    }

    ]

  return (
    <div>
        <h1>Kurssilista</h1>
        <Course courses={courses} />

    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
