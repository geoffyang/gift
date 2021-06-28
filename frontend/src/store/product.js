import { csrfFetch } from './csrf'

//********************************************** */
//                                               */
//                    ACTIONS                    */
//                                               */
//********************************************** */

const LOAD_PRODUCTS = "products/load"
const ADD_PRODUCT = "products/add"
const REMOVE_PRODUCT = "products/delete"
const EDIT_PRODUCT = "products/edit"

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
const editProduct = (id, product) => {
    return {
        type: EDIT_PRODUCT,
        product: product,
        id:id
    }
}

//********************************************** */
//                                               */
//                    THUNKS                     */
//                                               */
//********************************************** */

// GET /api/products
export const getProducts = () => async dispatch => {
    const response = await csrfFetch('/api/products')
    if (response.ok) {
        // products is an array of objs
        const products = await response.json();
        dispatch(loadProducts(products))
        return products;
    }
}
// GET /api/products/:id
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
// PUT /api/products/:id
export const editProductThunk = (id, product) => async (dispatch) => {

    const response = await csrfFetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product)
    });

    const data = await response.json();
    console.log('data in editProduct Thunk, returned from put route', data);
    // update redux state
    dispatch(editProduct(id, product));

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
        case EDIT_PRODUCT:
            newState = Object.assign({}, state);
            newState[action.id].title = action.product.title;
            newState[action.id].shortDescription = action.product.shortDescription;
            newState[action.id].longDescription = action.product.longDescription;
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


