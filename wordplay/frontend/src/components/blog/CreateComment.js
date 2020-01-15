import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'

import axios from "axios";
import 'babel-polyfill';


class CreateComment extends Component {


  render() {
    return(
      <Fragment>

          <div className="row">
            <div className="col-md-1"></div>

            <div className="col-md-10">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Написать комментарий</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
