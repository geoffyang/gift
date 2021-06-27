import { useParams, useHistory } from 'react-router-dom'
import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import './BigArticle.css'
// import SmallArticle from '../SmallArticle'
import Discussion from '../Discussion'
import * as productActions from "../../store/product";

export default function BigArticle() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(productActions.getProducts())
            .then(() => { setIsLoaded(true) })
    }, [dispatch])

    const deleteArticle = async => {
        history.push('/products')
        dispatch(productActions.deleteProductThunk(id))

    }

    const editArticle = () => {return null}

    const product = useSelector(state => state.products[id])

    return (
        <div className="big-article__container">
            {isLoaded && (
                <>

                    <div className="big-article__image-wrapper">
                        <img src={product.imageUrl} alt="product" />
                    </div>
                    <div className="big-article__content-wrapper">
                        <h1>{product.title}</h1>
                        {product?.title}
                        {product?.longDescription}
                    </div>
                    <div className="big-article__user-actions">
                        <i class="far fa-edit" onClick={editArticle}/>
                        <i class="far fa-trash-alt" onClick={deleteArticle}></i>
                    </div>
                    <Discussion />

                </>
            )}
        </div>
    );
}


