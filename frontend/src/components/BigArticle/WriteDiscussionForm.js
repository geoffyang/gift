
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as productActions from "../../store/product";



export default function WriteDiscussionForm({ user, productId, setShowDiscussionModal}) {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const discussion = {
            userId: user.id,
            text: text,
            productId: productId
        }
        console.log("sending this to addDiscussionThunk", {discussion, productId});
        dispatch(productActions.addDiscussionThunk(discussion, productId))


        return setShowDiscussionModal(false)
    }



    return (
        <form onSubmit={handleSubmit}>

            <label>
                Comment
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </label>

            <button type="submit">Post Comment</button>
        </form>
    )
}
