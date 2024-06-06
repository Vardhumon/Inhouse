import 'bootstrap/dist/css/bootstrap.min.css';

import AddTeacherForm from './screens/admin/AddTeacherForm'
import Header from './Header/Header'
import Login from './screens/login/register/Login'
import StudentDetail from './screens/StudentDetails/StudentDetail'
import Navbar from './screens/nav/Navbar';
import Sidebar from './screens/nav/Sidebar';
import { useState } from 'react';
import Homepage from './screens/homepage/Homepage';
import AddSubjects from './screens/admin/AddSubjects';

function App() {
  
  return (
    <div className='vh-100 vw-100 container-fluid'>
     {/* <Homepage /> */}
     <AddSubjects />
      {/* <Header />
      <StudentDetail /> */}
      {/* <AddTeacherForm /> */}
      {/* Your main content goes here */}
    </div>
  );

}

export default App
