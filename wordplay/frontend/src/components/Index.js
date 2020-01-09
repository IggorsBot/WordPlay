import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import store from "../store";
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'


export class Index extends Component {

    render(){
        return (
            <BrowserRouter>
                <App />
            </BrowserRouter>

        )
    }
}

ReactDOM.render(<Provider store={store}><Index/></Provider>, document.getElementById('app'));
