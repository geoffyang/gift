import { useParams } from 'react-router-dom'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import './BigArticle.css'
import SmallArticle from '../SmallArticle'
import * as productActions from "../../store/product";

export default function BigArticle() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const product = useSelector(state => state.products[id])

    console.log("before Thunk dispatch", product)

    useEffect(() => {
        dispatch(productActions.getProducts())
    }, [dispatch])

    console.log("after Thunk dispatch", product)


    return (

        <div className="container">
            <div className="main-article__image-wrapper">
                {product.imageUrl && <img src={product.imageUrl} alt="product" />}
                Hello from Big Article
            </div>
            <div className="main-article__content-wrapper">

            </div>
        </div>

    );
}

