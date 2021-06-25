import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/product";

//internal imports
import './ProductsDisplay.css';
import Article from '../Article'

export default function ProductsDisplay() {

    const dispatch = useDispatch();
    const allProductsObj = useSelector((state) => state.products);


    useEffect(() => {
        dispatch(productActions.getProducts())
    }, [dispatch])

    return (

        <div className="container">
            {Object.keys(allProductsObj)
                .map((key) => {
                    return <Article
                        imageUrl={allProductsObj[key].imageUrl}
                        key={allProductsObj[key].id}
                        id={allProductsObj[key].id}
                        title={allProductsObj[key].title} />
                })}
        </div>

    )

}

