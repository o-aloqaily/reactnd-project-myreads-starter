import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './components/Search'
import Main from './components/Main'

class BooksApp extends Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  getSavedBooks(query) {
    return this.state.books
  }

  // Arrow function so it will use the proper 'this'
  onShelfChange = (updatedBook, newShelf) => {
    BooksAPI.update(updatedBook, newShelf)
    .then(() => {
      // if new book is being added
      if (!updatedBook.shelf) {
        updatedBook.shelf = newShelf
        this.setState((prevState) => ({
          books: [...prevState.books, ...[updatedBook]]
        }))
      // if an added book is being modified
      } else {
        this.setState((prevState) => ({
          books: prevState.books.map((book) => {
            if (updatedBook.id === book.id)
              book.shelf = newShelf
            return book;
          }).filter((book) => book.shelf !== 'none')
        }))
      }
    })
    .catch((error) => `Opppps! something wrong happened, ${error}`)
  }

  renderMainPage() {
    return (
      <Main onShelfChange={this.onShelfChange} books={this.state.books} />
    )
  }

  renderSearch() {
    const { books } = this.state
    return (
      <Search
        onShelfChange={this.onShelfChange}
        getSavedBooks={this.getSavedBooks.bind(this)}
      />
    )
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={this.renderMainPage.bind(this)} />
        <Route exact path="/search" render={this.renderSearch.bind(this)} />
      </div>

    )
  }
}

export default BooksApp
