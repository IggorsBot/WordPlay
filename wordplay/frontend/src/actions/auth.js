import axios from "axios";
import store from '../store'

export const login=(username, password)=>{
  return axios
      .post('http://localhost:8000/accounts/api/auth/login', {
          username: username,
          password: password
      })
      .then(result => store.dispatch({
          type: 'LOGIN_SUCCESS',
          payload: result.data
      }))
};

export const registration = (username, email, password) =>{
  return axios
      .post('http://localhost:8000/accounts/api/auth/register', {
          username: username,
          email: email,
          password: password
      })
      .then(result => store.dispatch({
          type: 'REGISTRATION_SUCCESS',
          payload: result.data
      }))
};


export const logout = () => {
    return axios({
        method: 'POST',
        url: 'http://localhost:8000/accounts/api/auth/logout',
        headers: {
            "Content-Type": "application.json",
            "Authorization": `Token ${store.getState().token}`}})
        .then(result => store.dispatch({
            type: 'LOGOUT_SUCCESS'
        }))

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
