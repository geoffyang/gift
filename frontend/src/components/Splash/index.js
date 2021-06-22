import React, { useState } from "react";
// import Image from "../../images/00.jpg"

// internal
import Button from './Button'
import './Splash.css'

export default function Splash() {
    // const [showModal, setShowModal] = useState(false)

    // const openModal = () => {
    //     setShowModal(prev => !prev)
    // };

    return (
        <>
            <div className="splash__container">
                <div className="splash__text__wrapper">
                    <div className="splash__text">
                        <h1 className="cover-heading" id="cover-heading" >Do you need a gift?</h1>
                        <p className="lead" id="opener">Gift Now is why you'll never gift the same way again.</p>
                        <p className="lead">
                            {/* <a className="btn btn-lg btn-default" ">Get started</a> */}
                        </p>
                    </div>
                </div>
            </div>
        </>

    )
}

