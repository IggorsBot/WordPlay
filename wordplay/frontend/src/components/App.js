import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import Registration from './accounts/Registration'
import Login from './accounts/Login'
import store from "../store";

import {connect, Provider} from 'react-redux'
import WelcomePage from './accounts/WelcomePage'

class App extends Component {

    render(){
        const isLoading = this.props.user;
        const learning = <div className="container">

                        </div>;

        const indexPage = <div className="container">
                                <WelcomePage/>
                            </div>;

        console.log(isLoading)

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
