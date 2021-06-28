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
const REMOVE_DISCUSSION = "discussions/delete"
const ADD_DISCUSSION = "discussions/add"


const loadProducts = (products, discussions) => ({
    type: LOAD_PRODUCTS,
    products: products, //array of objs
    discussions: discussions // array of objs
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
        id: id
    }
}

//********************************************** */
//                                               */
//                PRODUCT THUNKS                 */
//                                               */
//********************************************** */

// GET /api/products
export const getProducts = () => async dispatch => {
    const productsResponse = await csrfFetch('/api/products')
    const discussionsResponse = await csrfFetch('/api/products/3/discussions')
    if (productsResponse.ok && discussionsResponse.ok) {
        // products is an array of objs
        const products = await productsResponse.json();
        const discussions = await discussionsResponse.json();
        console.log("global discussions retrieved", discussions);
        dispatch(loadProducts(products, discussions))
        return { products, discussions };
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
    // update redux state
    dispatch(editProduct(id, product));

    return response;
}
//********************************************** */
//                                               */
//             DISCUSSION THUNKS                 */
//                                               */
//********************************************** */

// DELETE /api/products/:productId/discussions/:discussionId
export const deleteDiscussionThunk = discussionId => async (dispatch) => {
    const response = await csrfFetch(`/api/products/3/discussions/${discussionId}`, { method: `DELETE` })
    const id = await response.json()
    dispatch(deleteDiscussion(id));
}

// POST /api/products/:productId/discussions
export const addDiscussionThunk = (discussion, productId) => async dispatch => {
    const response = await csrfFetch(`/api/products/${productId}/discussions`, {
        method: 'POST',
        body: JSON.stringify(discussion)
    })
    const data = await response.json();
    console.log("sending to addDiscussion reducer", {discussion:data.discussion,productId});
    dispatch(addDiscussion(data.discussion))
    return response;
}
const deleteDiscussion = discussionId => {
    return {
        type: REMOVE_DISCUSSION,
        discussionId: discussionId
    }
}
const addDiscussion = (discussion) => {
    return {
        type: ADD_DISCUSSION,
        discussion: discussion
    }
}
//*******************************************/
//                                          */
//                 REDUCER                  */
//                                          */
//*******************************************/

const initialState = { products: {}, discussions: {} }

export default function productReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_PRODUCTS:
            newState = { products: {}, discussions: {} };
            action.products.forEach(product => {
                newState.products[product.id] = product;
            }) // normalize arr into obj
            action.discussions.forEach(discussion => {
                newState.discussions[discussion.id] = discussion;
            })
            return newState;
        case ADD_PRODUCT:
            // newState = Object.assign({}, state);
            newState = JSON.parse(JSON.stringify(state));

            newState.products[action.product.id] = action.product;
            return newState;
        case REMOVE_PRODUCT:
            // newState = Object.assign({}, state);
            newState = JSON.parse(JSON.stringify(state));
            delete newState.products[action.id];
            return newState;
        case EDIT_PRODUCT:
            // newState = {...state};
            newState = JSON.parse(JSON.stringify(state));

            newState.products[action.id].title = action.product.title;
            newState.products[action.id].shortDescription = action.product.shortDescription;
            newState.products[action.id].longDescription = action.product.longDescription;
            return newState;
        case REMOVE_DISCUSSION:
            newState = JSON.parse(JSON.stringify(state));
            delete newState.discussions[action.discussionId];
            return newState;
        case ADD_DISCUSSION:
            newState = JSON.parse(JSON.stringify(state));
            // newState.products.discussions[action.discussion.id] = action.discussion;
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


