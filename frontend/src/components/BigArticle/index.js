import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import './BigArticle.css'
import SmallArticle from '../SmallArticle'
import * as productActions from "../../store/product";

export default function BigArticle() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);





    useEffect(() => {
        dispatch(productActions.getProducts())
        .then(() => { setIsLoaded(true) })
    }, [dispatch])


    const product = useSelector(state => state.products[id])


    return (
        <div className="container">
            {isLoaded && (
                <>

                    <div className="main-article__image-wrapper">
                        <img src={product.imageUrl} alt="product" />
                    </div>
                    <div className="main-article__content-wrapper">
                        <h1>{product.title}</h1>
                        {product?.title}
                        {product?.longDescription}

                    </div>

                </>
            )}
        </div>
    );
}


