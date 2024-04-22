import 'bootstrap/dist/css/bootstrap.min.css';

import AddTeacherForm from './screens/admin/AddTeacherForm'
import Header from './Header/Header'
import Login from './screens/login/register/Login'
import StudentDetail from './screens/StudentDetails/StudentDetail'
import Navbar from './screens/nav/Navbar';
import Sidebar from './screens/nav/Sidebar';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='vh-100 vw-100 container-fluid'>
      {/* <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} /> */}
      <Header />
      {/* <StudentDetail /> */}
      <AddTeacherForm />
      {/* Your main content goes here */}
    </div>
  );

}

export default App
