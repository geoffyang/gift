import { csrfFetch } from './csrf'

//**************************************** */
//                                         */
//                  ACTIONS                */
//                                         */
//**************************************** */

const LOAD_DISCUSSIONS = "discussions/load"
const ADD_DISCUSSION = "discussions/add"
const REMOVE_DISCUSSION = "discussions/delete"
const EDIT_DISCUSSION = "discussions/edit"


const loadDiscussions = discussions => ({
    type: LOAD_DISCUSSIONS,
    discussions: discussions
})
const addDiscussion = (discussion, productId) => {
    return {
        type: ADD_DISCUSSION,
        discussion: discussion,
        productId: productId
    }
}
const deleteDiscussion = discussionId => {
    return {
        type: REMOVE_DISCUSSION,
        discussionId: discussionId
    }
}
const editDiscussion = (discussionId, discussion) => {
    return {
        type: EDIT_DISCUSSION,
        discussion: discussion,
        discussionId: discussionId
    }
}
//***************************************** */
//                                          */
//                   THUNKS                 */
//                                          */
//***************************************** */
// GET /api/products/:productId/discussions
export const getDiscussionsThunk = (productId) => async dispatch => {
    const response = await csrfFetch(`/api/products/${productId}/discussions`)
    if (response.ok) {
        // discussions is an array of objs
        const discussions = await response.json();
        dispatch(loadDiscussions(discussions))
        return discussions;
    }
}
// POST /api/products/:productId/discussions
export const addDiscussionThunk = (discussion, productId) => async dispatch => {
    const response = await csrfFetch(`/api/products/${productId}/discussions`, {
        method: 'POST',
        body: JSON.stringify(discussion)
    })
    const data = await response.json();
    dispatch(addDiscussion(data, productId))
    return response;
}
// DELETE /api/products/:productId/discussions/:discussionId
export const deleteDiscussionThunk = discussionId => async (dispatch) => {
    const response = await csrfFetch(`/api/products/3/discussoins/${discussionId}`, { method: `DELETE` })
    const id = await response.json()
    dispatch(deleteDiscussion(id));
}
// PUT /api/products/:productId/discussions/:discussionId
export const editDiscussionThunk = (discussionId, discussion) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/3/discussions/${discussionId}`, {
        method: "PUT",
        body: JSON.stringify(discussion)
    });
    const data = await response.json();
    dispatch(editDiscussion(discussionId, discussion));
    return response;
}
//*******************************************/
//                                          */
//                 REDUCER                  */
//                                          */
//*******************************************/

const initialState = {}
export default function discussionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_DISCUSSIONS:
            newState = {};
            action.discussions.forEach(discussion => {
                newState[discussion.id] = discussion
            });
            return newState;
        case ADD_DISCUSSION:
            newState = Object.assign({}, state);
            newState[action.discussion.id] = action.discussion;
            return newState;
        case REMOVE_DISCUSSION:
            newState = Object.assign({}, state);
            delete newState[action.discussionId];
            return newState;
        case EDIT_DISCUSSION:
            newState = Object.assign({}, state);
            newState[action.discussionId] = action.discussion;
            return newState;
        default:
            return state;
    }
}
