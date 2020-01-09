import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import LearningWords from "./LearningWords";
import DictionaryList from "./DictionaryList";
import DictionaryDetail from "./DictionaryDetail"
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import {Link} from "react-router-dom"


class IndexStudy extends React.Component {
    render() {
        const menu =
            <ul className="nav justify-content-center mt-3 mb-5">
                <li className="nav-item">
                    <Link className="nav-link disabled"
                          to="#">
                        Создать словарь
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link disabled"
                          to="#">
                        Добавить словарь
                    </Link>
                </li>
            </ul>;

        return (
            <Fragment>
                <BrowserRouter>
                    {menu}
                    <Route exact path="/dictionaries" component={DictionaryList}/>
                    <Route exact path="/dictionaries/learning/:id" component={LearningWords}/>
                    <Route exact path="/dictionaries/detail/:id" component={DictionaryDetail}/>
                </BrowserRouter>
            </Fragment>
        )
    }
}


export default IndexStudy
