import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'

import axios from "axios";
import 'babel-polyfill';
import {tokenConfig} from "../../actions/auth";


class CreateComment extends Component {

  state = {
    comment_body: "",
  }

  async createComment () {
    try {
      let result = await axios.post(`http://localhost:8000/blog/api/comment/create`, {body: this.state.comment_body, post: this.props.post_id}, tokenConfig())
    } catch (err) {
      "error", err
    }
  }

  onChange = e => {
      this.setState({comment_body: e.target.value});
  };

  render() {
    return(
      <Fragment>
          <h2>Комментарии</h2>
          <div className="row create-comment">
            <div className="col-md-1"></div>

            <div className="col-md-10">
              <form>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-8">
                      <label htmlFor="exampleFormControlTextarea1">Написать комментарий</label>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                      <input type="submit"
                             value="Send"
                             onClick={()=>{
                                  this.createComment()}}/>
                    </div>
                  </div>
                  <textarea className="form-control" id="exampleFormControlTextarea1"
                            rows="3"
                            name="body"
                            onChange={this.onChange}
                            value={this.state.body}
                            placeholder="Enter comment">
                  </textarea>
                </div>
              </form>
            </div>

            <div className="col-md-1"></div>
          </div>

        </Fragment>
    )
  }
}

export default CreateComment
