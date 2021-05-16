import {GET_ERRORS, CLEAR_ERRORS, ITEMS_LOADING,  GET_ALL} from './types';


// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    };
};

// CLEAR ERRORS
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};

