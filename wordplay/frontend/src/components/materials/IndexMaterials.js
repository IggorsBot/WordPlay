import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import {Link} from "react-router-dom"

import BooksList from "./books/BooksList";
import BookDetail from "./books/BookDetail"


class IndexStudy extends React.Component {
    render() {
        const menu =
            <ul className="nav justify-content-center mt-3 mb-5">
                <li className="nav-item">
                    <Link className="nav-link"
                          to="/materials/books">
                        Книги
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link disabled"
                          to="#">
                        Видео
                    </Link>
                </li>
            </ul>;

        return (
            <Fragment>
                <BrowserRouter>
                    {menu}
                    <Route exact path="/materials/books/:slug" component={BookDetail}/>
                    <Route exact path="/materials/books" component={BooksList}/>
                </BrowserRouter>
            </Fragment>
        )
    }
}


export default IndexMaterials
