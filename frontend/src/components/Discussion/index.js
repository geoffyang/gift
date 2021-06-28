import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import './Discussion.css'
import * as discussionActions from "../../store/discussion";

export default function Discussion({ productId }) {
    const dispatch = useDispatch();
    const allDiscussions = useSelector(state => state.discussions)
    const [isLoaded, setIsLoaded] = useState(false);

    if (Object.keys(allDiscussions).length >= 1) setIsLoaded(true)

    return (
        <div className="discussion__container">

            {isLoaded && (
                <>
                    {Object.keys(allDiscussions)
                        .map(key => {
                            return (
                                <div key={key}>
                                    {allDiscussions[key].text}
                                </div>
                            )
                        })
                    }
                </>
            )}

        </div>

    )
}
