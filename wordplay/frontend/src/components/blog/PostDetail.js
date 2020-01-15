import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'

import axios from "axios";
import 'babel-polyfill';


class PostDetail extends Component {

  componentDidMount() {
      this.getPost();
  }

  getPost(){
    console.log("getPost")
  }

  render() {
    return(
      <Fragment>
        <h1>Post Detail</h1>
        <p>{this.props.match.params.slug}</p>
      </Fragment>
    )
  }
}

export default PostDetail
