import React from 'react';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const navbarStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative', 
    top: 0,
    left: isSidebarOpen ? '20vw' : '0',
    width: isSidebarOpen ? '79vw' : '99vw', 
    transition: 'width 0.3s ease', 
  };

  return (
    <nav style={navbarStyle} >
      <div>
        <button onClick={toggleSidebar} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer',marginLeft:"20px" }}>☰</button>
      </div>
      <div>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex justify-between' }}>
          <li style={{ marginRight: '20px' }}><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
          <li style={{ marginRight: '20px' }}><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</a></li>
          <li><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
