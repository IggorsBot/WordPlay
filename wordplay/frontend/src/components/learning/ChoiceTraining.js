import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import {Link} from "react-router-dom";


class ChoiceTraining extends Component{
  render(){
    return(
      <Fragment>
      <h1>Choice Training</h1>

      <div className="container-fluid mt-4">
          <div className="row justify-content-center">

              <Link to={`/learning/${this.props.match.params.id}/words`} className="card-link">
                  <div className="col-auto mb-3" key="0">
                      <div className="card dictionary-card">
                          <div className="card-body">
                              <h5 className="card-title text-center">Слово-перевод</h5>
                              <p className="card-text">Some quick example text to build on the card title and make
                                  up the bulk of the card's content.
                              </p>
                          </div>
                      </div>
                  </div>
                </Link>


                  <div className="col-auto mb-3" key="1">
                      <div className="card choice-training">
                          <div className="card-body text-center">
                              <h5 className="card-title">Карточки</h5>
                          </div>
                      </div>
                  </div>


                  <div className="col-auto mb-3" key="2">
                      <div className="card choice-training">
                          <div className="card-body text-center">
                              <h5 className="card-title">Карточки</h5>
                          </div>
                      </div>
                  </div>
          </div>
      </div>
      </Fragment>

    )
  }
}


export default ChoiceTraining
