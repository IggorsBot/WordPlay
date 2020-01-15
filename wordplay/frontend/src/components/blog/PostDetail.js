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
        <div className="row d-flex justify-content-center">
          <div className="post col-md-6">
            <h1>Post Detail</h1>
            <p>{this.props.match.params.slug}</p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default PostDetail
