// import { useParams } from 'react-router-dom'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import './Discussion.css'
import * as productActions from "../../store/product";

export default function Discussion({ discussion, user }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const deleteDiscussion = async (discussionId)=> {
        dispatch(productActions.deleteDiscussionThunk(discussionId))
    }

    let userActionButtons = (<></>);
    if (+user.id === +discussion.userId) {
        userActionButtons = (<div className="discussion__user-actions">
            <i className="fas fa-pencil-alt" onClick={() => setShowModal(true)} />
            <i className="far fa-trash-alt" onClick={deleteDiscussion(discussion.id)}></i>
        </div>)
    }

    return (

        <div className="discussion__container">

            <span >
                {discussion.text}
            </span>
            <span >
                {user.id === discussion.userId ? `${user.username}` : `User ${discussion.userId}`}
            </span>
            <span>{userActionButtons}</span>

        </div>

    )
}

