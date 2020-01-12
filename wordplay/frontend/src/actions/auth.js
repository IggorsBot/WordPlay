import axios from "axios";
import store from '../store'
import 'babel-polyfill';


export const login = async (username, password) => {
  let result = await axios.post('http://localhost:8000/accounts/api/auth/login', {
    username: username,
    password: password
  })
  store.dispatch({
    type: 'LOGIN_SUCCESS',
    payload: result.data
  })
};

export const registration = async (username, email, password) => {
  let result = await  axios.post('http://localhost:8000/accounts/api/auth/register', {
    username: username,
    email: email,
    password: password
  })
  store.dispatch({
    type: 'REGISTRATION_SUCCESS',
    payload: result.data
  })
};


export const logout = async () => {
  let result = await axios({
    method: 'POST',
    url: 'http://localhost:8000/accounts/api/auth/logout',
    headers: {
      "Content-Type": "application.json",
      "Authorization": `Token ${store.getState().token}`}})
      store.dispatch({
        type: 'LOGOUT_SUCCESS'
      })
};


export const tokenConfig = () => {
    const token = store.getState().token;
    const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      }
    return config
};
