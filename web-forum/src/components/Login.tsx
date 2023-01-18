import React, {useState, useEffect} from 'react';
import WelcomeCSS from '../styles/Welcome.module.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import tokenConfig from './helper';

function Login() {
    // action is either Login or Register
    const [text, setText] = useState({username: "", password: ""});
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

    function handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setText(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const data = {'user': {'username': text.username, "password": text.password}};
        setText({username: "", password: ""})
        console.log(data);
        axios.post('http://localhost:3000/login', data)
            .then(res => {
                console.log(res.data.token);
                const token =  res.data.token;
                localStorage.setItem('jwt', token)
                navigate("/forum");
            })
            .catch(err => console.log(err));
    }
        

    

    return <div className='container'>
        <h1>Login</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">Username</label>
                <input onChange={handleUsername} id="usernameInput" className="form-control" type="text" 
                name="username" value={text.username} placeholder='Enter your username here'/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input onChange={handleUsername} id="passwordInput" className="form-control" type="text" 
                name="password" value={text.password} placeholder='Enter your password here'/>
            </div>
                <button onClick={handleSubmit} type="button" 
                className={`${WelcomeCSS.btn} btn btn-dark`}>Login</button>
        </form>
    </div>
}

export default Login;