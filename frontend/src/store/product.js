import { csrfFetch } from './csrf'

const SET_PRODUCT = "product/set"
const REMOVE_PRODUCT = "product/remove"

const setProduct = (product) => {
    return {
        type: SET_PRODUCT,
        payload: product
    }
}
const removeProduct = () => {
    return { type: REMOVE_PRODUCT }
}

//*********************THUNKS********************** */

// login at POST /api/ROUTE TBD
export const upload = (product) => async (dispatch) => {
    const { credential, password } = product;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setproduct(data.product));
    return response;
}
