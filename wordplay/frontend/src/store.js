import {createStore} from "redux";
import reducer from "./reducers/auth"


const store = createStore(reducer);

export default store;
