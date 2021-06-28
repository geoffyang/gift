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
import * as discussionActions from "../../store/discussion";

export default function BigArticle() {
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDiscussionModal, setShowDiscussionModal] = useState(false);
    console.log("how many times do I render?");

    useEffect(() => {
        dispatch(productActions.getProducts())
            .then(() => { setIsLoaded(true) })
    }, [dispatch])

    const deleteArticle = async => {
        history.push('/products')
        dispatch(productActions.deleteProductThunk(id))
    }

    const writeDiscussion = async => {
        dispatch(productActions.addDiscussionThunk())
    }


    const product = useSelector(state => state.products.products[id])
    const user = useSelector((state) => state.session.user);
    const discussions = useSelector(state => state.products.discussions)
    console.log("line 42 discussions looks like this", discussions)
    const relevantDiscussion = []
    for (const property in discussions) {
        console.log('what is typeof', typeof +id);
        if (discussions[property].productId === +id) {
            relevantDiscussion.push(discussions[property])
        }
    }
    console.log('relevant discussion', relevantDiscussion);
    // const allDiscussion = useSelector(state => state.discussion)

    if (!user) return <Redirect to="/products" />

    let userActionButtons = (<></>)
    if (product && user.id === product.userId) {
        // console.log('how many times does this run');
        userActionButtons = (<div className="big-article__user-actions">
            <i className="far fa-edit" onClick={() => setShowModal(true)} />
            <i className="far fa-trash-alt" onClick={deleteArticle} />
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
                        <span>{product?.longDescription}</span>
                    </div>
                    <br />
                    {userActionButtons}
                    <br />
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <EditArticleForm setShowModal={setShowModal} />
                        </Modal>
                    )}
                    <h2>Discussion:</h2>

                    <span >Write a comment <i className="far fa-edit" onClick={() => setShowDiscussionModal(true)} /></span>

                    {showDiscussionModal && (
                        <Modal onClose={() => setShowDiscussionModal(false)}>
                            <WriteDiscussionForm
                                user={user}
                                productId={id}
                                setShowDiscussionModal={setShowDiscussionModal} />
                        </Modal>
                    )}


                    <br /><br />


                    {relevantDiscussion.length &&
                        relevantDiscussion.map(d => {
                            return <Discussion discussion={d} key={d.id} user={user} />
                        })
                    }

                </>
            )}
        </div>
    );
}
