import axios from 'axios';
import {returnErrors} from "./systemActions";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL, LOGOUT_FAIL
} from './types';

//настройки для всеx запросов
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

// Check token & load user
export const loadUSER = () => (dispatch, getState) => {
    // User loading
    dispatch({type: USER_LOADING});

    // получаем user_id
    const user_id = localStorage.getItem('user_id');

    axios
      .all([
          axios.get(`/api/users/${user_id}`, tokenConfig(getState)),
      ])
      .then(([
                 firstReq,
                 secondReq
             ]) => {
          // console.log("firstReq =%o secondReq =%o", firstReq, secondReq);

          dispatch({
              type: USER_LOADED,
              payload: {user: firstReq.data}
          })
      })

      .catch(err => {
          dispatch(returnErrors(err.data, err.status));
          dispatch({
              type: AUTH_ERROR
          });
      });
};

// Register User
export const registerUSER = (data) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    // преобразуем Объект в JSON
    // const body = JSON.stringify({name, email, password});

    axios
    // .post('/api/users', body, config)
      .post('/api/users', data, config)
      .then(res => {
            localStorage.setItem('access_token', res.data.access_token);
            // localStorage.setItem('refresh_token', res.data.refresh_token);
            localStorage.setItem('user_id', res.data.user.id);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }
      )
      .catch(err => {
          dispatch(
            returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
          );
          dispatch({
              type: REGISTER_FAIL
          });
      });
};

// Login User
export const loginUSER = (data) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    // const body = JSON.stringify({email, password});

    axios
      .post('/api/users/login', data, config)
      .then(res => {
          localStorage.setItem('access_token', res.data.access_token);
          // localStorage.setItem('refresh_token', res.data.refresh_token);
          localStorage.setItem('user_id', res.data.user.id);
          // cookie.set('token', token);
          dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data
          })
      })
      .catch(err => {
          dispatch(
            returnErrors(err.data, err.status, 'LOGIN_FAIL')
          );
          dispatch({
              type: LOGIN_FAIL
          });
      });
};

// Logout User
export const logoutUSER = () => (dispatch, getState) => {
   /* axios
      .delete('/api/users/logout')
      .then(() => {
          localStorage.removeItem('access_token');
         // localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_id');
          dispatch({
              type: LOGOUT_SUCCESS
          })
      })
      .catch(err => {
          dispatch(
            returnErrors(err.data, err.status, 'LOGOUT_FAIL')
          );
          dispatch({
              type: LOGOUT_FAIL
          });
      });*/
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    return {
        type: LOGOUT_SUCCESS
    };
};

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from Redux store
    // const token = getState().Auth.access_token;
    // Get token from localStorage
    const locallStorageToken = localStorage.getItem('access_token');
    // console.log("token %s LS_token %s equal", token, locallStorageToken, token || locallStorageToken);

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // If token, add to headers
    if (locallStorageToken) {
        config.headers['x-auth-token'] = locallStorageToken;
    }

    return config;
};
