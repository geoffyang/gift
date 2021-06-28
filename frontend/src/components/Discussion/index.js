// import { useParams } from 'react-router-dom'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import './Discussion.css'
import * as productActions from "../../store/product";

export default function Discussion({ text }) {
    const dispatch = useDispatch();


    return (

        <div className="discussion__container">


                {text}


        </div>

    )
}
