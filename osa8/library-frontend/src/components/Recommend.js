import React from 'react'

const Recommend = (props) => {
  if (!props.show) {
    return null
  }

  console.log(props.user)
  const genre = props.user.data.me.favoriteGenre
  const books = props.result.loading ? [] : props.result.data.allBooks

  console.log(books)

  return (
    <div>
      <h2>books</h2>

      <p>books in your preferred genre: {genre}</p>
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
            if(a.genres.find(g => g === genre)) {
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
    </div>
  )
}

export default Recommend