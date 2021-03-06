import { csrfFetch } from './csrf'

const SET_USER = "user/set"
// const RESTORE_USER = "user/restore"
const REMOVE_USER = "user/remove"

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}
const removeUser = () => {
    return { type: REMOVE_USER }
}

//*********************THUNK********************** */
// login at POST /api/session
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
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return data;
};
// signup at POST /api/users
export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    const data = await response.json();
    dispatch(setUser(data.user));

    return response;
}
// new login thunk supporting profile image
// export const createUser = (user) => async (dispatch) => {
//     const { images, image, username, email, password } = user;
//     const formData = new FormData();
//     formData.append("username", username);
//     formData.append("email", email);
//     formData.append("password", password);
//     // for multiple files
//     if (images && images.length !== 0) {
//         for (var i = 0; i < images.length; i++) {
//             formData.append("images", images[i]);
//         }
//     }
//     // for single file
//     if (image) formData.append("image", image);

//     const res = await csrfFetch(`/api/users/`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//         body: formData,
//     });
//     const data = await res.json();
//     dispatch(setUser(data.user));
// }

// log out at DELETE api/session, returns {message:"success"}
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: "DELETE",
    })

    dispatch(removeUser())
    return response;
}

const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;

        default:
            return state;
    }
}


