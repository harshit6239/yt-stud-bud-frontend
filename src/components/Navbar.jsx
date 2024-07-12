import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logout from '../api/logout';
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    logout()
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <nav className="navbar">
      <Link to="/home">
        <img src="/logo.svg" alt="logo" className='logo' />
      </Link>
      <div className="links">
        <button onClick={logoutUser}>Log Out</button>
      </div>
    </nav>
  )
}

export default Navbar