import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sidebarStyle = {
    display: 'block',
    backgroundColor: '#f4f4f4',
    color: '#333',
    width: '20vw',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: isOpen ? '0' : '-20vw',
    transition: 'left 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    zIndex: 1000,
    padding: '20px',
    borderRight: '2px solid #ccc',
    // borderRadius: '0 10px 10px 0'
  };

  const handleLinkClick = () => {
    toggleSidebar();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const ulStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: '10px 0',
  };

  const liStyle = {
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#fff',
    transition: 'background-color 0.3s ease'
  };

  const dropdownStyle = {
    maxHeight: isDropdownOpen ? '300px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.5s ease'
  };

  return (
    <aside style={sidebarStyle}>
      <ul style={ulStyle} className='mt-5'>
        <li style={liStyle}>
          <Link to="/" onClick={handleLinkClick} style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link>
        </li>
        <li style={liStyle}>
          <button onClick={toggleDropdown} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'none', color: '#333', width: '100%', textAlign: 'left' }}>
            Admin {isDropdownOpen ? '▲' : '▼'}
          </button>
          <ul style={{ ...ulStyle, ...dropdownStyle }}>
            <li style={liStyle}>
              <Link to="/add-teacher" onClick={handleLinkClick} style={{ textDecoration: 'none', color: '#333' }}>Add Teacher</Link>
            </li>
            <li style={liStyle}>
              <Link to="/add-subjects" onClick={handleLinkClick} style={{ textDecoration: 'none', color: '#333' }}>Add Subjects</Link>
            </li>
            <li style={liStyle}>
              <Link to="/batch-students" onClick={handleLinkClick} style={{ textDecoration: 'none', color: '#333' }}>Add Batch Students</Link>
            </li>
            <li style={liStyle}>
              <Link to="/student-data-elective" onClick={handleLinkClick} style={{ textDecoration: 'none', color: '#333' }}>Student Data Elective</Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
