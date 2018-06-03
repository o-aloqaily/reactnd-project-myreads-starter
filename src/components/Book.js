import React from 'react'

const Book = (props) => {
  let thumbnail
  if ('imageLinks' in props.book) {
    thumbnail = props.book.imageLinks.thumbnail
  } else {
    thumbnail = ''
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select value={ props.book.shelf || 'none' } onChange={(event) => props.onShelfChange(props.book, event.target.value) }>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{ props.book.title }</div>
      <div className="book-authors">{ props.book.authors }</div>
    </div>
  )
}

export default Book
