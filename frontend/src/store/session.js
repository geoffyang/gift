import {csrfFetch } from './csrf'

const SET_USER = "user/set"
const REMOVE_USER = "user/remove"

const setUser = (user) => {
    return {
        type: SET_USER,
        payload:user
    }
}

const removeUser = () => {
    return { type: REMOVE_USER }
}

// csrfFetch to POST /api/session
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));


    return response;
}

const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.payload
            };
        case REMOVE_USER:
            return {user:null};
        default:
            return state;
    }
}


