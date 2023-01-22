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
            <div className="col-lg-8 mx-auto p-3 py-md-5">
                <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
                    <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="me-2" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path></svg> */}
                    <span className="fs-4">Welcome to the NUSCS Forum Page!</span>
                    </a>
                </header>

                <main>
                    <h1>Get started discussing!</h1>
                    <p className="fs-5 col-md-8">This is a safe space for all NUS Computer Science to discuss academic or career-related topics. Register or Login below to quickly get started</p>

                    <div>
                        <button onClick={handleClick} name="register" type="button" className={`${WelcomeCSS.btn} btn btn-dark`} style={{backgroundColor: "#A3A5C3"}}>Register</button>
                        <button onClick={handleClick} name="login" type="button" className={`${WelcomeCSS.btn} btn btn-dark`} style={{backgroundColor: "#576490"}}>Login</button>
                        {/* <a href="/docs/5.0/examples/" className="btn btn-primary btn-lg px-4">Download examples</a> */}
                    </div>
                </main>
            </div>
        </div>
    )
    
}

export default Welcome;