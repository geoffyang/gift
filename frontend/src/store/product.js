import { csrfFetch } from './csrf'

//********************************************** */
//                                               */
//                    ACTIONS                    */
//                                               */
//********************************************** */

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

//********************************************** */
//                                               */
//                    THUNKS                     */
//                                               */
//********************************************** */

export const getProducts = () => async dispatch => {
    const response = await csrfFetch('/api/products')
    if (response.ok) {
        // products is an array of objs
        const products = await response.json();
        dispatch(loadProducts(products))
    }
}

export const getOneProduct = (id) => async dispatch => {
    await csrfFetch(`/api/products/${id}`)
}

// upload product POST /api/products
export const uploadProductThunk = (product) => async (dispatch) => {
    const { title, image, images, longDescription, shortDescription, userId } = product;

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
export const deleteProductThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/${id}`, { method: `DELETE` })
    id = await response.json()
    dispatch(deleteProduct(id));
}

export const editProductThunk = (product) => async (dispatch) => {
    const { title, image, longDescription, shortDescription, userId } = product;

    const formData = new FormData();
    formData.append("title", title)
    formData.append("shortDescription", shortDescription)
    formData.append("longDescription", longDescription)
    formData.append("userId", userId)

    // for multiple files
    // if (images && images.length !== 0) {
    //     for (var i = 0; i < images.length; i++) {
    //         formData.append("images", images[i]);
    //     }
    // }

    // for single file
    if (image) formData.append("image", image);

    // update database
    const response = await csrfFetch('/api/products', {
        method: 'PUT',
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
    });
    const data = await response.json();
    // update redux state
    dispatch(addProduct(data.product));

    return response;
}

//*******************************************/
//                                          */
//                 REDUCER                  */
//                                          */
//*******************************************/

const initialState = { product: {}, }

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
            newState[action.product.id] = action.product;
            return newState;
        case REMOVE_PRODUCT:
            newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
}


// products: {
        // 1: {
        //      title: "tiny purifier",
        //      shortDescription: "",
        //      longDescription: "",
        //      imageUrl,
        //      userId
        // }
// },
// state: {},
// discussion: {},


