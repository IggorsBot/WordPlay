import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import {registration} from '../../actions/auth'

class Registration extends Component {

    state = {
      username: "",
      password: "",
      email: "",
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = async e => {
        e.preventDefault();
        await registration(this.state.username, this.state.email, this.state.password)
        this.props.history.push("/dictionaries")
    };

    render() {
        const {username, password, email} = this.state;
        return(
            <Fragment>
                <div className="container w-50">
                    <div className="card card-body mt-5">
                        <div className="login-box">
                        <h1 className="text-center">Registration</h1>
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
                                <label>E-mail</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    onChange={this.onChange}
                                    value={email}
                                    placeholder="Enter E-mail"/>

                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    onChange={this.onChange}
                                    value={password}
                                    placeholder="Enter Password"/>

                            </div>
                            <input type="submit" value="Registration" />
                            <a href="#"
                               onClick={() => {
                                   this.props.changeFlag()
                            }}>I have an account</a>
                        </form>
                    </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}

export default Registration
