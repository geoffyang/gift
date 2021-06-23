import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Logo from '../Logo';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton className="profile-button" user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className="nav-container">
            <Logo />
            <ul className="nav__links">
                <li >
                    <NavLink
                        style={{ marginRight: '1rem'}}
                        className='links' exact to="/">Home</NavLink>
                    <NavLink
                        style={{ marginRight: '1rem' }} className='links' exact to="/upload">Upload a Product</NavLink>

                    {isLoaded && sessionLinks}
                </li>
            </ul>

        </div>
    );
}

export default Navigation;
