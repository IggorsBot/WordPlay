import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import {login} from '../../actions/auth'
import { withRouter } from "react-router-dom";


class Login extends Component {

    state = {
        username: "",
        password: "",
    };

    onSubmit = e => {
      e.preventDefault();
      login(this.state.username, this.state.password).then(
              this.props.history.push("/dictionaries")
      )
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render(){
        const {username, password} = this.state;
        return(
            <Fragment>

                <div className="container w-50">
                    <div className="card card-body mt-5">
                        <div className="login-box">
                        <h1 className="text-center">Login here</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        onChange={this.onChange}
                                        value={username}
                                        placeholder="Enter Username"/>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        onChange={this.onChange}
                                        value={password}
                                        placeholder="Enter Password"
                                    />
                                </div>

                                <input type="submit" name="submit" value="Login"/>
                                <a>Lost your password?</a>
                                <a href="#"
                                      onClick={()=>{
                                          this.props.changeFlag()
                                    }}>Don't have an account</a>
                        </form>
                    </div>
                </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Login)
