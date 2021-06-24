import { csrfFetch } from './csrf'
import { useSelector } from "react-redux";

//************************************************* */
//                    ACTIONS                       */
//************************************************* */

const LOAD_PRODUCTS = "products/load"
const ADD_PRODUCT = "products/add"
const REMOVE_PRODUCT = "products/delete"

const loadProducts = products => ({
    type: LOAD_PRODUCTS,
    products: products
})

const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product: product
    }
}
const deleteProduct = (id) => {
    return {
        type: REMOVE_PRODUCT,
        id: id
    }
}

//************************************************* */
//                    THUNKS                        */
//************************************************* */

export const getProducts = () => async dispatch => {
    const response = await csrfFetch('/api/products')
    if (response.ok) {
        // products is an array of objs
        const products = await response.json();
        dispatch(loadProducts(products))
    }
}

// upload product POST /api/products
export const uploadProductThunk = (product) => async (dispatch) => {
    const { title, image, images, longDescription, shortDescription, userId } = product;
    // const userId = useSelector((state) => state.session.user.userId);

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
    dispatch(addProduct(data.product));

    return response; //==============>
}
// delete product DELETE /api/products/:id
// export const deleteProductThunk = (id) => async(dispatch => {

// }

//************************************************* */
//                    REDUCER                       */
//************************************************* */

const initialState = { product: {} ,}

export default function productReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_PRODUCTS:
            newState = {};
            action.products.forEach(product => {
                newState[product.id] = product;
            }) // normalize arr into obj
            return newState;
        case ADD_PRODUCT:
            newState = Object.assign({}, state);
            newState.product = action.payload;
            return { woof: "hello" };
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
