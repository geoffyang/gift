import { useParams, Redirect, useHistory } from 'react-router-dom'
import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import './BigArticle.css'
import Discussion from '../Discussion'
import EditArticleForm from './EditArticleForm'
import { Modal } from '../../context/Modal';
import * as productActions from "../../store/product";

export default function BigArticle() {
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    console.log("how many times do I render?");

    useEffect(() => {
        dispatch(productActions.getProducts())
            .then(() => { setIsLoaded(true) })
    }, [dispatch])

    const deleteArticle = async => {
        history.push('/products')
        dispatch(productActions.deleteProductThunk(id))
    }
    const product = useSelector(state => state.products[id])
    const user = useSelector((state) => state.session.user);
    const discussions = useSelector(state => state.products.discussions)
    const relevantDiscussion = []
    for (const property in discussions) {
        if (discussions[property].productId === +id) {
            relevantDiscussion.push(discussions[property])
        }
    }

    if (!user) return <Redirect to="/products" />

    let userActionButtons = (<></>)
    if (product && user.id === product.userId) {
        userActionButtons = (<div className="big-article__user-actions">
            <i className="far fa-edit" onClick={() => setShowModal(true)} />
            <i className="far fa-trash-alt" onClick={deleteArticle}></i>
        </div>)
    }

    return (
        <div className="big-article__container">
            {isLoaded && (
                <>

                    <div className="big-article__image-wrapper">
                        {product.imageUrl && <img src={product.imageUrl} alt="product" />}
                    </div>
                    <div className="big-article__content-wrapper">
                        <h1>{product?.title}</h1>
                        <h3>{product?.shortDescription}</h3>
                        <h3>{product?.longDescription}</h3>
                    </div>

                    {userActionButtons}
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <EditArticleForm setShowModal={setShowModal} />
                        </Modal>
                    )}
                    <h2>Discussion:</h2>
                    {relevantDiscussion.length &&
                        relevantDiscussion.map(d => {
                            return <Discussion text={d.text} />
                        })
                    }
                </>
            )}
        </div>
    );
}
