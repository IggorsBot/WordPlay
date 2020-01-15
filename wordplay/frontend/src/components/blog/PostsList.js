import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'

import axios from "axios";
import 'babel-polyfill';
import {Link} from "react-router-dom";



class PostsList extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
      this.getPosts();
  }

  async getPosts () {
    try {
      let res = await axios.get('http://localhost:8000/blog/api/posts')
      this.setState({ posts: res.data})
    } catch (error){
      console.log("error", error)
    }
  }

  render() {
    return(
      <Fragment>
        <div className="row d-flex justify-content-center">
        <div className="col-md-10">
        {this.state.posts.map((post, index) => (
          <div key={index} className="post post-border">
              <div>
                <Link to={`/blog/post/${post.slug}`} className="card-link">
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.description}</p>
              </div>
          </div>
        ))}
        </div>
        </div>
      </Fragment>
    )
  }
}

export default PostsList
