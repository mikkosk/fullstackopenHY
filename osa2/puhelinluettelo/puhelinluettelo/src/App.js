import React, { useState, useEffect } from 'react'
import Filter from './komponentit/Filter'
import PersonForm from './komponentit/PersonForm'
import Persons from './komponentit/Persons'
import personService from './services/numbers'
import Notification from './komponentit/Notification'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: '' , 
     number: '' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addNumber = (event) => {
      event.preventDefault()
      const personNew = {
          name: newName,
          number: newNumber
      }

      console.log(persons.name)
      const nimet = persons.map(person => person.name)
      if (!nimet.includes(newName)) {
      personService
        .create(personNew)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Added ${newName}`)
            setTimeout(() => {setMessage(null)}, 5000)
          })
      }

      else {
        const result = window.confirm(`${newName} is already added to phonebook, replace the old number?`)
        if(result) {
          const person = persons.find(p => p.name === personNew.name)
          const changedPerson = {...person, number: personNew.number}
          personService
            .update(changedPerson.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
              setMessage(`${newName}'s number has been changed`)
              setTimeout(() => {setMessage(null)}, 5000)
            })

        }
      }
  }

  const removePerson = person => {
    const result = window.confirm(`Delete ${person.name}?`)
    if(result) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage(`${person.name} has been removed`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(error => {
          setErrorMessage(`${person.name} has already been removed from the server`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
  }

  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} removePerson={removePerson}/>
    </div>
  )

}

export default App