import React, {Fragment, Component} from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import {Link} from "react-router-dom"


class BookDetail extends React.Component {

  state = {
    id: 0,
    title: "",
    slug: "",
    info: "",
    author: "",
    image: "",
    level: "",
  }


  async getBook () {
    try {
      let result = await axios.get(`http://localhost:8000/materials/api/book/detail/${this.props.match.params.slug}`)
      this.setState({
        id: result.data.id,
        title: result.data.title,
        slug: result.data.slug,
        info: result.data.info,
        author: result.data.author,
        image: result.data.image,
        level: result.data.level,
      })
    } catch (err) {
      console.log("error", err)
    }
  };


    render() {
        return (
            <Fragment>
              <div className="row d-flex justify-content-center">
                <div className="col-md-1"></div>

                  <div className="col-md-10">
                    <div className="row">
                      <h1>{this.state.title}</h1>
                    </div>

                    <div className="row post-image">
                      <img  src={this.state.img}/>
                    </div>

                    <div className="row">
                      <p>{this.state.info}</p>
                    </div>
                  </div>


                  <div className="col-md-1"></div>
                </div>
            </Fragment>
        )
    }
}


export default BookDetail
