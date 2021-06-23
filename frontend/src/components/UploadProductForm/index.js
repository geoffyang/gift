import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as productActions from "../../store/product";

import './UploadProductForm.css';

export default function UploadProductForm() {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [errors, setErrors] = useState([]);

    // must be logged in to upload
    if (!sessionUser) return <Redirect to='/' />;

    const handleProductSubmit = e => {
        e.preventDefault();

        return dispatch(productActions.uploadProduct({
            title,
            shortDescription,
            longDescription,
            imageUrl
        }))
    }

    return (
        <form onSubmit={handleProductSubmit}>
            <br />
            <br />
            <br />
            <br />
            <h2>Hello from product uploadProduct</h2>
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
                <input
                    type="text"
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}

                />
            </label>
            {/* <label>
                Upload Image
                <input
                    type="file"
                    value={XXXXX}
                    onChange={(e) => setXXXXX(e.target.value)}

                />
            </label> */}
            <button type="submit">Sign Up</button>
        </form>

    )

}

