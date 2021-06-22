import React, { useState } from "react";
// import Image from "../../images/00.jpg"

// internal
import Button from './Button'
import './Splash.css'

export default function Splash() {
    const [showModal, setShowModal]=useState(false)

    const openModal =()  =>   {
        setShowModal(prev => !prev)
    };

    return (
        <div className = "splash_background" >
            <Button />
        </div>

    )
}

