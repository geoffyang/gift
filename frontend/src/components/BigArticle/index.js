import { useParams, Redirect, useHistory } from 'react-router-dom'
import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import './BigArticle.css'
import Discussion from '../Discussion'
import EditArticleForm from './EditArticleForm'
import WriteDiscussionForm from './WriteDiscussionForm'
import { Modal } from '../../context/Modal';
import * as productActions from "../../store/product";

export default function BigArticle() {
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDiscussionModal, setShowDiscussionModal] = useState(false);
    const [testVariable, setTestVariable] = useState(false)
    console.log("how many times do I initialize?");


    useEffect(() => {
        dispatch(productActions.getProducts())
            .then(() => console.log("hello from useEffect"))
            .then(() => { setIsLoaded(true) })
            .then(() => { setTestVariable(true) })
    }, [dispatch])

    const deleteArticle = async => {
        history.push('/products')
        dispatch(productActions.deleteProductThunk(id))
    }

    const product = useSelector(state => state.products.products[id])
    const user = useSelector((state) => state.session.user);
    const discussions = useSelector(state => state.products.discussions)
    const relevantDiscussion = []
    for (const property in discussions) {
        if (discussions[property].productId === +id) {
            relevantDiscussion.push(discussions[property])
        }
    }
    const allDiscussion = useSelector(state => state.discussion)

    if (!user) return <Redirect to="/products" />

    let userActionButtons = (<></>)
    if (product && user.id === product.userId) {
        // console.log('how many times does this run');
        userActionButtons = (<div className="big-article__user-actions">
            <i className="far fa-edit" onClick={() => setShowModal(true)} />
            <i className="far fa-trash-alt" onClick={deleteArticle} />
        </div>)
    }
    return 
}
