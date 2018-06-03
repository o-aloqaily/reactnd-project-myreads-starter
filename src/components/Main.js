import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

const Main = (props) => {
  const currReading = props.books.filter((book) => book.shelf === "currentlyReading")
  const wantToRead = props.books.filter((book) => book.shelf === "wantToRead")
  const read = props.books.filter((book) => book.shelf === "read")

  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading" books={currReading} onShelfChange={props.onShelfChange} />
            <Shelf title="Want To Read" books={wantToRead} onShelfChange={props.onShelfChange} />
            <Shelf title="Read" books={read} onShelfChange={props.onShelfChange} />
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default Main
