import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as productActions from "../../store/product";

import './UploadProductForm.css';

export default function UploadProductForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [image, setImage] = useState(null);
    // const [images, setImages] = useState("");

    const [errors, setErrors] = useState([]);

    // must be logged in to upload
    if (!sessionUser) return <Redirect to='/' />;

    const handleSubmit = e => {
        e.preventDefault();
        let newErrors = [];
        // <<<<<<<<<<<=================
        dispatch(productActions.uploadProductThunk({
            title, shortDescription,
            longDescription, image, userId: sessionUser.id
        })).then(() => {
            setTitle("");
            setShortDescription("");
            setLongDescription("");
            setImage(null);
            history.push('/products')
        }).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                newErrors = data.errors;
                setErrors(newErrors)
            }
        })
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };
    return (
        <form className="container"
            // style={{ display: "flex", flexFlow: "column" }}
            onSubmit={handleSubmit}>

            <h2>Upload your product </h2>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Product Title
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Short Description
                <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Long Description
                <textarea
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}

                ></textarea>
            </label>
            <label>
                <input type="file" onChange={updateFile} />
            </label>
            <button type="submit">Submit Product</button>
        </form>

    )

}

