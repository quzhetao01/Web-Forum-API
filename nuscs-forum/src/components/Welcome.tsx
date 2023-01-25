import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import  WelcomeCSS from '../styles/Welcome.module.css';
import tokenConfig from '../helper/helper';

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
            <div className="col-lg-8 mx-auto p-3 py-md-5">
                <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
                    <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                    
                    <span className="fs-4">Welcome to the NUSCS Forum Page!</span>
                    </a>
                </header>

                <main>
                    <h1>Get started discussing!</h1>
                    <p className="fs-5 col-md-8">This is a safe space for all NUS Computer Science to discuss academic or career-related topics. Register or Login below to quickly get started</p>

                    <div>
                        <button onClick={handleClick} name="register" type="button" className={`${WelcomeCSS.btn} btn btn-dark`} style={{backgroundColor: "#A3A5C3"}}>Register</button>
                        <button onClick={handleClick} name="login" type="button" className={`${WelcomeCSS.btn} btn btn-dark`} style={{backgroundColor: "#576490"}}>Login</button>
                    </div>
                </main>
            </div>
        </div>
    )
    
}

export default Welcome;