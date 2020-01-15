import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import {logout} from '../../actions/auth'
import {connect} from 'react-redux'

class Header extends Component {

    render(){
        const user = this.props.user;

         return (
                <nav className="navbar" >
                    <div className="container">
                        <Link className="navbar-brand" to="/index">WordPlay</Link>

                            <ul className="nav justify-content-center">
                                <li className="nav-item">
                                    <Link className="nav-link"
                                       to="/blog">Блог</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dictionaries"
                                       className="nav-link">Учеба</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link disabled"
                                       to="#">Курсы</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link"
                                       to="/materials">Материалы</Link>
                                </li>
                            </ul>


                        <div  className="nav justify-content-end">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button"
                                       aria-haspopup="true" aria-expanded="false">{user ? user.username : ""}</Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="#">Профиль</Link>
                                    <div className="dropdown-divider"/>
                                    <Link
                                        onClick={() => logout()}
                                        className="dropdown-item"
                                        to="">
                                        Выйти
                                    </Link>
                                </div>
                            </li>
                        </div>
                    </div>
                </nav>
            )
        }
    }


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Header)
