import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as productActions from "../../store/product";

import './ProductsDisplay.css';

export default function ProductsDisplay() {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);



    // must be logged in to upload
    // if (!sessionUser) return <Redirect to='/' />;

    useEffect(() => {
        dispatch(productActions.getProducts())
    }, [dispatch])

    return (

        <div>
            hello
        </div>



    )

}

