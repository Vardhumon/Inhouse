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
import StudentData from './screens/StudentDataBatchWise';
import StudentDataElectiveBatchWise from './screens/StudentDataElectiveBatchWise';
import StudentDetailTemp from './screens/StudentDetails/Temp';

function App() {
  
  return (
    <div className='vh-100 vw-100 container-fluid'>
     {/* <Homepage />
     <Header />

      */}
     {/* <Homepage /> */}
     {/* <AddSubjects /> */}
      {/* <Header />
      <StudentDetail /> */}
      <Header />
     <StudentDetailTemp />
      {/* <StudentData /> */}
      {/* <StudentDataElectiveBatchWise /> */}
      {/* <AddTeacherForm /> */}
      {/* Your main content goes here */}
    </div>
  );

}

export default App
