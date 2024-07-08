import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import signUpReq from '../api/signUp'
import { validateToken } from '../api/validateToken';
import './signup.css'

const signup = () => {

  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(()=>{
    validateToken().then((res) => {
      navigate('/home');
    });
  },[]);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    signUpReq({ email: formData.get('email'), username: formData.get('username'), password: formData.get('password'), confirmPassword: formData.get('confirmPassword') }).then((res) => {
      if(res.status === 201) {
        navigate('/home');
      }
    }).catch((err) => {
      toast.error(err.message, {
        position: 'top-right',
      });
    });
  }

  const goToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  return (
    <div className="signUpPage">
      <div className="logo"><img src="/logo.svg" alt=""/></div>
      <div className='signUpContainer'>
        <div className="signUpPageLeft">
        </div>
        <div className="signUpPageRight">
          <h1 id='get'>Get</h1>
          <h1 id='started'><strong>Started</strong></h1>
          <form ref={formRef}>
            <input type="text" placeholder="Email" name='email' />
            <input type="text" placeholder="Username" name='username' />
            <input type="password" placeholder="Password" name='password' />
            <input type="password" placeholder="Confirm Password" name='confirmPassword' />
            <div className="btns">
              <button id='signUpBtn' onClick={handleSignUp}>Sign Up</button>
              <button id='loginBtn' type="submit" onClick={goToLogin}>Login</button>
            </div>
          </form>
          <div className="connectLinks">
            <div>know the Creator</div>
            <a href="https://www.instagram.com/harshit_manchanda_/" className="insta" target='blank'><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/harshit-manchanda-7360a4252/" className="linkedin" target='blank'><FaLinkedin /></a>
            <a href="https://github.com/harshit6239" className="github" target='blank'><FaGithub /></a>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default signup