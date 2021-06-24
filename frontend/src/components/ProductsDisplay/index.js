import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as productActions from "../../store/product";

import './ProductsDisplay.css';
import Article from '../Article'

export default function ProductsDisplay() {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const allProductsObj = useSelector((state) => state.products);

    // must be logged in to upload
    // if (!sessionUser) return <Redirect to='/' />;

    useEffect(() => {
        dispatch(productActions.getProducts())
    }, [dispatch])

    return (

        <div className="container">
            {Object.keys(allProductsObj)
                .map((key) => <Article
                    image={allProductsObj[key].imageUrl} key={allProductsObj[key].id} title={allProductsObj[key].title} />)}
        </div>

    )

}

