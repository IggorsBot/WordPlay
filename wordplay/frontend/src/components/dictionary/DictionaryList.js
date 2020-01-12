import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill';
import store from './../../store'
import {tokenConfig} from "../../actions/auth";
import {Route, BrowserRouter, Link, Router} from "react-router-dom";
import axios from "axios";



class DictionaryList extends Component{
    state = {
        title_new_dictionary: "",
        id_new_dictionary: 0,
        dictionaries:[]
    };

    componentDidMount() {
        this.getDictionaries();
    }

    async getDictionaries () {
      try {
        let res = await axios.get('http://localhost:8000/learning/api/dictionaries/', tokenConfig())
        this.setState({ dictionaries: res.data})
      } catch (error){
        console.log("error", error)
      }
    }

    async createDictionary(title) {
            try{
              let res = await axios.post('http://localhost:8000/learning/api/dictionaries/create', {title: title,}, tokenConfig())
            } catch (error){
              console.log("error", error)
            }
    }

    onChange = e => {
        this.setState({title_new_dictionary: e.target.value});
    };


    render(){
        const dicts = this.state.dictionaries.map((dict, index) =>{
            return(
                        <div className="col-auto mb-3" key={index + 1}>
                            <Link to={`/dictionaries/detail/${dict.id}`} className="card-link">
                                <div className="card dictionary-card">
                                    <div className="card-body">
                                        <h5 className="card-title">{dict.title}</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make
                                            up the bulk of the card's content.</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </Link>
                        </div>
            )});
        return(
                <Fragment>
                    <div className="container-fluid mt-4">
                        <div className="row justify-content-center">
                                <div className="col-auto mb-3" key="0">
                                    <div className="card dictionary-card">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Создать новый словарь</h5>
                                            <form className="mt-5">
                                                <div className="form-group">
                                                    <input type="text"
                                                           className="form-control"
                                                           name="title"
                                                           onChange={this.onChange}
                                                           value={this.state.title_new_dictionary}
                                                            placeholder="Enter Title Dictionary"/>
                                                </div>
                                                <input type="submit"
                                                       className="dictionary-button"
                                                       value="Create"
                                                       onClick={()=>{
                                                            this.createDictionary(this.state.title_new_dictionary).then()
                                                }}/>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                        {dicts}
                        </div>
                    </div>
                </Fragment>
        )
    }
}

export default DictionaryList
