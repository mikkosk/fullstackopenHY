import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  if (!props.show) {
    return null
  }

  const books = props.result.loading ? [] : props.result.data.allBooks

  console.log(books)

  if(books !== []) books.map(b => b.genres.map(g => { if (!genres.includes(g)) setGenres(genres.concat(g))}))

  console.log(genres)

  return (
    <div>
      <h2>books</h2>

      <p>current genre limitation: {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a => {
            if(!genre || a.genres.find(g => g === genre)) {
              return(
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                </tr>
              )
              }
              return null
            }
          )}
        </tbody>
      </table>
      <div>
        {genres.map(g => 
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        )}
        <button onClick={() => setGenre(null)}>All genres</button>
      </div>
    </div>
  )
}

export default Books