import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import Login from "./Login";
import Registration from "./Registration";


class WelcomePage extends Component {
    state = {
        flag: true
    };

    onLoginClick = () => {
        this.setState({flag: false})
    };

    onRegistrationClick = () => {
      this.setState({flag: true})
    };

    render(){
        return(
            <Fragment>
                {this.state.flag ? <Login changeFlag={this.onLoginClick}/> : <Registration changeFlag={this.onRegistrationClick}/>}
            </Fragment>
        )
    }
}

export default WelcomePage
