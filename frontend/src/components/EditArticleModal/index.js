import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditArticleForm from '../BigArticle/EditArticleForm';

export default function EditArticleModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditArticleForm />
                </Modal>
            )}
        </>
    );
}
