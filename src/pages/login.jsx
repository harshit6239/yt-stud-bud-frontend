import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import loginReq from '../api/login'
import './login.css'
import { validateToken } from '../api/validateToken';

const login = () => {

  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(()=>{
    validateToken().then((res) => {
      navigate('/home');
    });
  },[]);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    loginReq({ email: formData.get('email'), password: formData.get('password') }).then((res) => {
      if(res.status === 200) {
        console.log(res.data);
        navigate('/home');
      }
    }).catch((err) => {
      toast.error(err.message, {
        position: 'top-right',
      });
    });
  }

  const goToSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  }

  return (
    <div className="loginPage">
      <div className="logo"><img src="/logo.svg" alt=""/></div>
      <div className='loginContainer'>
        <div className="loginPageLeft">
          <h1 id='welcome'>Welcome</h1>
          <h1 id='back'><strong>Back</strong></h1>
          <form ref={formRef}>
            <input type="text" placeholder="Email" name='email' />
            <input type="password" placeholder="Password" name='password' />
            <div className="btns">
              <button id='loginBtn' type="submit" onClick={handleLogin}>Login</button>
              <button id='signUpBtn' onClick={goToSignUp}>Sign Up</button>
            </div>
          </form>
          <div className="connectLinks">
            <div>know the Creator</div>
            <a href="https://www.instagram.com/harshit_manchanda_/" className="insta" target='blank'><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/harshit-manchanda-7360a4252/" className="linkedin" target='blank'><FaLinkedin /></a>
            <a href="https://github.com/harshit6239" className="github" target='blank'><FaGithub /></a>
          </div>
        </div>
        <div className="loginPageRight">
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default login