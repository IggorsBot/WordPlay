import React, {Fragment, Component} from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import {Link} from "react-router-dom"


class BooksList extends Component {

  state = {
    books: []
  }

  async getBooks () {
    try {
      let result = await axios.get(`http://localhost:8000/materials/api/books`)
      this.setState({
        books: result.data
      })
    } catch (err) {
      console.log("error", err)
    }
  };

    render() {
      const books = this.state.books.map((book, index) => {
        return (
          <div class="col-sm-3" key={index}>
            <Link to={`/materials/books/${book.slug}`} >
               <div class="card">
                 <div class="card-body">
                   <img class="card-text" src={book.image}/>
                   <h5 class="card-title">{book.title} - {book.author}</h5>
                 </div>
               </div>
             </Link>
          </div>
        )
      })
        return (
            <Fragment>
              <div class="row">
                {books}
              </div>
            </Fragment>
        )
    }
}


export default BooksList
