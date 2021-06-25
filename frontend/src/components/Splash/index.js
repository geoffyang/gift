import React from "react";
// import Image from "../../images/00.jpg"

// internal
import './Splash.css'

export default function Splash() {
    // const [showModal, setShowModal] = useState(false)

    // const openModal = () => {
    //     setShowModal(prev => !prev)
    // };

    return (
        <>
            <div className="splash__container">
                <div className="splash__site">
                    <div className="splash__text__wrapper">
                        <div className="splash__text">
                            <h1 className="cover-heading" id="cover-heading" >Need a gift?</h1>
                            <p className="lead" id="opener">Gift Now is why you'll never gift the same way again.</p>
                            <p className="lead" >
                                <span id="get_started">Get started</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

