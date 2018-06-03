import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends Component {
  state = {
    query: '',
    showingBooks: []
  }

  queryBooks(queryText) {
    const savedBooks = this.props.getSavedBooks()
    this.setState({ query: queryText })
    BooksAPI.search(queryText)
    .then((showingBooks) => {
      this.setState({ showingBooks: showingBooks.map((book) => {
          for (let savedBook of savedBooks) {
            if (book.id === savedBook.id) {
              book = savedBook
            }
          }
          return book
        })
      })
    })
    .catch((error) => {
      console.log(`Error fetching books, ${error}`)
      this.setState({ showingBooks: [] })
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
             value={this.state.query}
             onChange={(event) => this.queryBooks(event.target.value)}
             type="text"
             placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.showingBooks.map((book) => {
              return (
                <li key={ book.id }>
                  <Book book={book} onShelfChange={this.props.onShelfChange} />
                </li>
              )
            })
          }
          </ol>
        </div>
      </div>
    )
  }

}

export default Search
