import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL, EDIT_USER
} from '../actions/types';

const initialState = {
    // access_token: localStorage.getItem('access_token'),
    // refresh_token: localStorage.getItem('refresh_token'),
    isAuthenticated: null,
    isLoading: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
      // получение данных о пользователе
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
      // пользователь загружен
        case EDIT_USER:
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: {
                    ...state.user,
                    ...action.payload.user,
                    avatar: action.payload.avatar
                }
            };
      // при успешной авторизации/регистрации
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            // localStorage.setItem('access_token', action.payload.access_token);
            // localStorage.setItem('refresh_token', action.payload.refresh_token);
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false
            };
      // при ошибке удаление token из localStorage и очистка state
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            //удаляем токен и id из localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
            // localStorage.removeItem('refresh_token');
            return {
                ...state,
                // token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}