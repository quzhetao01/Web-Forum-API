import React, {useState, useEffect} from 'react';
import WelcomeCSS from '../styles/Welcome.module.css';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import tokenConfig from '../helper/helper';

const Login = (): JSX.Element => {
    // action is either Login or Register
    const [text, setText] = useState({username: "", password: ""});
    const [isError, setError] = useState({username: false, password: false});
    const [justRegistered, setJustRegistered] = useState(false);
    const [wrongLogin, setWrongLogin] = useState(false);
    const location = useLocation();

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
        console.log(location);
        if (location.state) {
          // let users know that they just registed and need to log in again
          setJustRegistered(location.state.register);
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
        
      // reset error messages
      setError({username: false, password: false});
      setWrongLogin(false);

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
      if (text.username && text.password) {
        setText({username: "", password: ""})
        const data = {'user': {'username': text.username, "password": text.password}};
        console.log(data);
        axios.post('http://localhost:3000/sessions', data, { withCredentials: true })
        .then(res => {
          const token =  res.data.token;
          console.log(res);
          // localStorage.setItem('jwt', token);
          // window.location.href = 'http://localhost:3001/forum'; //redirect to forum page
        })
        .catch(err => {
          console.log(err);
          if (err.response.data.error === "Invalid username or password") {
            setWrongLogin(true);
          }
        });
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
    
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
    
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
                      {/* optional message */}
                      {justRegistered && <p>Thank you for registering. Please login with your new account to access the forum page</p>}
                      {/* Error messages */}
                      {wrongLogin && <p className="text-danger">Invalid username or password. Please try again</p>}
                      {isError.username && <p className="text-danger">Username cannot be empty</p>}
                      {isError.password && <p className="text-danger">Password cannot be empty</p>}
    
                      
    
                      
    
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button onClick={handleSubmit} type="button" className={`${WelcomeCSS.btn} btn btn-dark`} style={{backgroundColor: "#576490", width: "30%"}}>Login</button>
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


export default Login;