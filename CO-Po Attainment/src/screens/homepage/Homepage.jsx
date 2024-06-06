import React, { useState } from 'react'
import Navbar from '../nav/Navbar'
import Sidebar from '../nav/Sidebar'


function Homepage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
    <div>
         <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} />
    </div>
  )
}

export default Homepage