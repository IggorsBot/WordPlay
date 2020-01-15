import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'

import axios from "axios";
import 'babel-polyfill';


class Comments extends Component {

  state = {
    comments: []
  }

  componentDidMount() {
      this.getComments();
  }

  async getComments () {
    try {
      let result = await axios.get(`http://localhost:8000/blog/api/comments/${this.props.slug}`)
      this.setState({
        comments: result.data
      })
      } catch (err) {
      console.log("error", err)
    }
  }


  render() {
    return(
      <Fragment>
          <div className="row">
            <div className="col-md-1"></div>

            <div className="col-md-10">
              <div className="comments">
                {this.state.comments.map((comment, index)=>{
                  return(
                    <div key={index}>
                      <h3 className="comment-author">{comment.name}</h3> <p className="comment-created">{comment.created}</p>
                      <p className="comment-body">{comment.body}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="col-md-1"></div>
          </div>

      </Fragment>
    )
  }
}

export default Comments
