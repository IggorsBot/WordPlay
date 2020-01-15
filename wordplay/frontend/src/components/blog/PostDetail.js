import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'

import axios from "axios";
import 'babel-polyfill';

import CreateComment from './CreateComment'
import Comments from './Comments'


class PostDetail extends Component {

  state = {
    title: "",
    img: "",
    body: "",
    publish: "",
  }

  componentDidMount() {
      this.getPost();
  }

  async getPost () {
    try {
      let result = await axios.get(`http://localhost:8000/blog/api/posts/detail/${this.props.match.params.slug}`)
      this.setState({
        title: result.data.title,
        img: result.data.img,
        body: result.data.body,
        publish: result.data.publish
      })
    } catch (err) {
      console.log("error", err)
    }
  }

  render() {
    return(
      <Fragment>

      <div className="row d-flex justify-content-center">
        <div className="col-md-1"></div>

          <div className="col-md-10">
            <div className="row">
              <h1>{this.state.title}</h1>
            </div>
            <div className="row">
              <p>{this.state.body}</p>
            </div>

            <CreateComment />
            <Comments slug={this.props.match.params.slug}/>
          </div>


          <div className="col-md-1"></div>
        </div>
      </Fragment>
    )
  }
}

export default PostDetail
