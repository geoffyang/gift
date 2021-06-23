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
    const { title, imageUrl, longDescription, shortDescription } = product;

    // get userID
    // userId = session....

    const response = await csrfFetch('/api/XXXXXXXXX', {
        method: 'POST',
        body: JSON.stringify({
            title,
            imageUrl,
            longDescription,
            shortDescription,
            // userId
        }),
    });
    const data = await response.json();
    dispatch(setProduct(data.product));
    return response;
}
