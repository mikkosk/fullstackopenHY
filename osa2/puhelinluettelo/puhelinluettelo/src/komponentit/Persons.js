import React from 'react'

const Persons = ({ persons, newFilter, removePerson }) => {


    const noFilter = newFilter === ''
    const personsToShow = noFilter
        ? persons
        : persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))
    return (personsToShow.map(person => 
        <div key={person.name}>
        <p>{person.name} {person.number}</p>
        <button onClick={() => removePerson(person)}>remove</button>
        </div>
        ))    
}

export default Persons