import { csrfFetch } from './csrf'

//**************************************** */
//                                         */
//                  ACTIONS                */
//                                         */
//**************************************** */

const LOAD_DISCUSSIONS = "discussion/load"
const ADD_DISCUSSION = "discussion/add"
const REMOVE_DISCUSSION = "discussion/delete"

const loadDiscussions = discussions => ({
    type: LOAD_DISCUSSIONS,
    discussions:discussions
})

//***************************************** */
//                                          */
//                   THUNKS                 */
//                                          */
//***************************************** */
// GET /api/discussions
export const getDiscussions = () => async dispatch => {
    const response = await csrfFetch('/api/discussions')
    if (response.ok) {
        // discussions is an array of objs
        const discussions = await response.json();
        dispatch(loadDiscussions(discussions))
        return discussions;
    }
}



//*******************************************/
//                                          */
//                 REDUCER                  */
//                                          */
//*******************************************/

const initialState = { discussion: {}, }

export default function discussionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {

        default:
            return state;
    }
}
