import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import './Discussion.css'
import * as discussionActions from "../../store/discussion";


export default function Discussion({ text }) {
    return (

        <div className="discussion__container">


            {text}


        </div>

    )

}
