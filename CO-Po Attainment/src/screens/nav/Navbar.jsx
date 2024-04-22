import React from 'react';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
    const navbarStyle = {
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed', // Fixed positioning
        top: 0,
        right: 0,
        width: isSidebarOpen ? '80vw' : '100vw',// Adjust width when sidebar is open
        transition: 'width 0.3s ease', // Add transition for smooth resizing
    };

    return (
        <nav style={navbarStyle}>
            <div>
                <button onClick={toggleSidebar} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>☰</button>
            </div>
            <div>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex' }}>
                    <li style={{ marginRight: '20px' }}><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
                    <li style={{ marginRight: '20px' }}><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</a></li>
                    <li><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
