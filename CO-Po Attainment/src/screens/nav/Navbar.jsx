import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-primary bg-primary'>
      <div className='container-fluid'>
        <button 
          onClick={toggleSidebar} 
          className='btn btn-primary' 
          style={{ 
            border: 'none', 
            color: '#fff', 
            fontSize: '24px', 
            cursor: 'pointer' 
          }}>
          ☰
        </button>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link text-white' href='/'>Home</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-white' href='/about'>About</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-white' href='/contact'>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
