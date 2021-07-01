import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, } from "react";
import { useParams } from 'react-router-dom'
import * as productActions from "../../store/product";

export default function BigArticle() {
    console.log("how many times does function initialize?");

    const dispatch = useDispatch();
    let { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [testVariable, setTestVariable] = useState(false)

    useEffect(() => {
        console.log("hello from useEffect1")
        dispatch(productActions.getProducts())
        console.log("hello from useEffect2")
        setIsLoaded(true)
        console.log("hello from useEffect3")
        setTestVariable(true)
    }, [dispatch])

    const products = useSelector(state => state.products.products)
    console.log('products', products);
    const user = useSelector((state) => state.session.user);
    console.log("user", user);

    return (
        <div className="big-article__container">

            {console.log("RENDER!")}
            {/* {console.log({ isLoaded, products, user, testVariable })} */}

        </div>
    )
}
