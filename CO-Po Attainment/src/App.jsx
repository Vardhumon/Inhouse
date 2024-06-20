import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Login from './screens/login/register/Login';
import Navbar from './screens/nav/Navbar';
import Sidebar from './screens/nav/Sidebar';
import Homepage from './screens/homepage/Homepage';
import AddTeacherForm from './screens/admin/AddTeacherForm';
import AddSubjects from './screens/admin/AddSubjects';
import StudentDetail from './screens/StudentDetails/StudentDetail';
import StudentData from './screens/StudentDataBatchWise';
import StudentDataElectiveBatchWise from './screens/StudentDataElectiveBatchWise';
import StudentDetailTemp from './screens/StudentDetails/Temp';
import PsoTable from './screens/PSO/PsoTable';
import CourseOutcome from './screens/Course/CourseOutcome';
import CourseObjectiveTable from './screens/Course/CourseObjective';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookies.get('token'); // Retrieve the token from cookies

      if (token) {
        try {
          const response = await axios.post('http://localhost:8000/verifyToken', { token }); // Replace with your backend endpoint for token verification
          const { isAdmin } = response.data; // Assuming your backend returns isAdmin field
          setIsAuthenticated(true);
          console.log("User authenticated");
          console.log(isAuthenticated);
        } catch (error) {
          console.error('Error verifying token:', error);
          setIsAuthenticated(false);
        }
      }
    };

    checkAuthentication();
  }, []); // Empty dependency array ensures this runs only once on component mount


// Mock authentication function
const login = (credentials) => {
  if (credentials === 123) {
  setIsAuthenticated(true);
  console.log("User authenticated");
  console.log(isAuthenticated);
  }
  };


  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className='vh-100 vw-100'>
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Adjust main content width based on sidebar state */}
        <div style={{ marginLeft: isSidebarOpen ? '30vw' : 0, transition: 'margin-left 0.3s ease' }}>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login onLogin={login}/>
                )
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Homepage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/add-teacher"
              element={
                isAuthenticated ? (
                  <AddTeacherForm />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/student-detail"
              element={
                isAuthenticated ? (
                  <StudentDetail />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/add-subjects"
              element={
                isAuthenticated ? (
                  <AddSubjects />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/batch-students"
              element={
                isAuthenticated ? (
                  <StudentData />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/student-data-elective"
              element={
                isAuthenticated ? (
                  <StudentDataElectiveBatchWise />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/student-detail-temp"
              element={
                isAuthenticated ? (
                  <StudentDetailTemp />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/pso-table"
              element={
                isAuthenticated ? (
                  <PsoTable />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path=":subname/course-outcome/:subjectdataid"
              element={
                isAuthenticated ? (
                  <CourseOutcome />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path=":subname/course-objective/:subjectdataid"
              element={
                isAuthenticated ? (
                  <CourseObjectiveTable />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
