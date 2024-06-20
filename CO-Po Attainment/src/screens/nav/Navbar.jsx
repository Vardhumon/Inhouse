import React from 'react';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const navbarStyle = {
    backgroundColor: '#444',
    color: "#aa21da",
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative', 
    top: 0,
    left: isSidebarOpen ? '20vw' : '0',
    width: isSidebarOpen ? '80vw' : '100vw', 
    transition: 'width 0.2s ease', 
  };

  return (
    <nav style={navbarStyle} >
      <div>
        <button onClick={toggleSidebar} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer',marginLeft:"10px" }}>☰</button>
      </div>
      <div className='flex'>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex' }}>
          <li style={{ marginRight: '20px' }}><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
          <li style={{ marginRight: '20px' }}><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</a></li>
          <li><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
