import { csrfFetch } from './csrf'

//**************************************** */
//                                         */
//                  ACTIONS                */
//                                         */
//**************************************** */

const LOAD_DISCUSSION = "discussion/load"
const ADD_DISCUSSION = "discussion/add"
const REMOVE_DISCUSSION = "discussion/delete"

//***************************************** */
//                                          */
//                   THUNKS                 */
//                                          */
//***************************************** */




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
