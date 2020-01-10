import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import store from "../store";
import {connect, Provider} from 'react-redux'

import Registration from './accounts/Registration'
import Login from './accounts/Login'
import WelcomePage from './accounts/WelcomePage'

import Header from './layout/Header'

import IndexStudy from "./IndexStudy";


class App extends Component {

    render(){
        const isLoading = this.props.user;
        const learning = <div className="container">
                            <Header/>
                            <Route path="/dictionaries" component={IndexStudy}/>
                        </div>;

        const indexPage = <div className="container">
                                <WelcomePage/>
                            </div>;

        return (
            <Fragment>
                {isLoading ? learning : indexPage}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(App)
