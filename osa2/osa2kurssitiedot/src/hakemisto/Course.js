import React from 'react'

const Course = (props) => {
    const { courses } = props
    const allCourses = courses.map(course =>
    <div key={course.id}>
        <Header course={course} />
        <Content course={course.parts} />
        <Total course={course.parts} />
    </div>)

    return (
        allCourses
    )
}

const Header = (props) => {
    console.log(props)
    return(
        <h2>{props.course.name}</h2>
    )
}

const Content = (props) => {
    console.log(props)
    const { course } = props
    return (
        <div>
            <Part course={course}/> 
        </div>
    )
}

const Total = (props) => {
    const { course } = props
    const exercises = course.map(part => part.exercises)
    console.log(props)
    const total = exercises.reduce((a, c) => a + c)
    return(
        <div>Total of {total} exercises</div>
    )

}

const Part = (props) => {
    console.log(props)
    const { course } = props
    

    const rows = () =>
        course.map(part => <p key={part.id}>{part.name} {part.exercises} </p>)

    return (
        <div>
            {rows()}
        </div>
    )
}


export default Course