import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/home">
        <img src="/logo.svg" alt="logo" className='logo' />
      </Link>
      <div className="links">
        
      </div>
    </nav>
  )
}

export default Navbar