import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'

import {Link} from "react-router-dom"
import {Route} from "react-router";

import PostsList from "./PostsList"
import PostDetail from "./PostDetail"


class IndexBlog extends Component {

  render() {

    const menu =
        <ul className="nav justify-content-center mt-3 mb-5">
            <li className="nav-item">
                <Link className="nav-link disabled"
                      to="#">
                    Последние
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link disabled"
                      to="#">
                    Популярные
                </Link>
            </li>
        </ul>;

    return (
      <Fragment>
        {menu}
        <Route exact path="/blog" component={PostsList}/>
        <Route exact path="/blog/post/:slug" component={PostDetail}/>

      </Fragment>
    )
  }
}

export default IndexBlog
