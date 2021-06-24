import { csrfFetch } from './csrf'
import { useSelector } from "react-redux";

//************************************************* */
//                    ACTIONS                       */
//************************************************* */

const LOAD_PRODUCTS = "products/load"
const SET_PRODUCT = "products/set"
const REMOVE_PRODUCT = "products/remove"

const loadProducts = products => ({
    type: LOAD_PRODUCTS,
    payload: products
})

const setProduct = (product) => {
    return { type: SET_PRODUCT, payload: product }
}
// const removeProduct = () => {
//     return { type: REMOVE_PRODUCT }
// }

//************************************************* */
//                    THUNKS                        */
//************************************************* */

export const getProducts = () => async dispatch => {
    const response = await fetch('api/products')
}

// upload product POST /api/products
export const uploadProduct = (product) => async (dispatch) => {
    const { title, image, images, longDescription, shortDescription } = product;
    const userId = useSelector((state) => state.session.user.userId);

    const formData = new FormData();
    formData.append("title", title)
    formData.append("shortDescription", shortDescription)
    formData.append("longDescription", longDescription)
    formData.append("userId", userId)

    // for multiple files
    if (images && images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
    }

    // for single file
    if (image) formData.append("image", image);

    // update database
    const response = await csrfFetch('/api/products', {
        method: 'POST',
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
    });
    const data = await response.json();
    // update redux state
    dispatch(setProduct(data.product));
    return response;
}


//************************************************* */
//                    REDUCER                       */
//************************************************* */

const initialState = { product: null }

export default function productReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_PRODUCT:
            newState = Object.assign({}, state);
            newState.product = action.payload;
            return newState;
        case REMOVE_PRODUCT:
            newState = Object.assign({}, state);
            newState.product = null;
            return newState;

        default:
            return state;
    }
}


// {
//     "items": {
//         1: { name: "blue" },
//         2: { name: "green" }
//     }
// }


// {
//     "items": {
//         1: { name: "blue" },
//         2: { name: "green" },
//         3: { name: "red" }
//     }
// }

// {
//     newItem:{name:"red"},
//     "items": {
//         1: { name: "blue" },
//         2: { name: "green" },
//         3: { name: "red" }
//     }
// }
