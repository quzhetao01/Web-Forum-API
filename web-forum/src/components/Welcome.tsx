import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import  WelcomeCSS from '../styles/Welcome.module.css';
import tokenConfig from './helper';

function Welcome() {
    const navigate = useNavigate();

    // Redirect to forum page is user is already logged in, stay at the same page if not
    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            let config = tokenConfig();
            axios.get('http://localhost:3000/me', config)
                .then(res => {
                    window.location.href = 'http://localhost:3001/forum'
                })
                .catch(err => console.log(err))
        }
    })

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        console.log(event);
        const {name} = event.currentTarget ;
        const link = `/${name}`; // Either register or login route
        navigate(link);

    }

    return (
        <div id={WelcomeCSS["welcome"]}>
            <h1>Welcome to NUSCS Forum Page!</h1>
            <h3>Choose to login or register below</h3>
            <button onClick={handleClick} name="register" type="button" className={`${WelcomeCSS.btn} btn btn-light`}>Register</button>
            <button onClick={handleClick} name="login" type="button" className={`${WelcomeCSS.btn} btn btn-dark`}>Login</button>
        </div>
    )
    
}

export default Welcome;