import React from 'react';
import {useNavigate} from "react-router-dom"
import WelcomeCSS from './Welcome.module.css';

function Welcome() {
    const navigate = useNavigate();
    function handleClick(event) {
        const {name} = event.target;
        const link = `/${name}`; // Either register or login route
        navigate(link, {state: {action: name === "register" ? "Register" : "Login"}});

    }

    return (
        <div>
            <h1>Welcome to NUSCS Forum Page!</h1>
            <h3>Choose to login or register below</h3>
            <button onClick={handleClick} name="register" type="button" className={`${WelcomeCSS.btn} btn btn-light`}>Register</button>
            <button onClick={handleClick} name="login" type="button" className={`${WelcomeCSS.btn} btn btn-dark`}>Login</button>
        </div>
    )
    
}

export default Welcome;