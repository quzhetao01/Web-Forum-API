import React, {useState, useEffect} from 'react';
import WelcomeCSS from '../styles/Welcome.module.css';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import tokenConfig from '../helper/helper';

const Register= (): JSX.Element => {
    const [text, setText] = useState({username: "", password: ""});
    const [isError, setError] = useState({username: false, password: false, passwordTooShort: false});
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
    }, [])

    
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
      // empty username and password
      if (!text.username) {
        setError(prevValue => { 
          return {...prevValue, 
                  username: true}});
      }
      if (!text.password) {
        setError(prevValue => {
          return {...prevValue, 
          password: true}});
      }
      // password is not long enough
      if (text.password.length < 12) {
        setError(prevValue => { 
          return {...prevValue, 
                  passwordTooShort: true}});
      } else if (text.username && text.password) {
        const data = {"user": {'username': text.username, "password": text.password}};
        setText({username: "", password: ""});
        axios.post('http://localhost:3000/users', data)
            .then(res => {
                console.log(res);
                // inform login page that user just registered
                navigate("/login", {state: {register: true}}); 
            })
            .catch(err => console.log(err));
      }
        
        
    }

    return <section className="vh-100" >
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
  
                  <form className="mx-1 mx-md-4">
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input onChange={handleUsername} name="username" value={text.username} type="text" id="usernameInput" className="form-control" />
                        <label className="form-label" htmlFor="passwordInput">Username</label>
                      </div>
                    </div>
  

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input onChange={handleUsername} name="password" value={text.password} type="password" id="passwordInput" className="form-control" />
                        <label className="form-label" htmlFor="passwordInput">Password</label>
                      </div>
                    </div>
                    {/* Error messages */}
                    {isError.username && <p className="text-danger">Username cannot be empty</p>}
                    {isError.password && <p className="text-danger">Password cannot be empty</p>}
                    {isError.passwordTooShort && <p className="text-danger">Password must be at least 12 characters long!</p>}

  

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button onClick={handleSubmit} type="button" className={`${WelcomeCSS.btn} btn btn-dark`} style={{backgroundColor: "#576490", width: "30%"}}>Register</button>
                    </div>
  
                  </form>
  
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
  
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    className="img-fluid" alt="Sample"/>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
} 


export default Register;