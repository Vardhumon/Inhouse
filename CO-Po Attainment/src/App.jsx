import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import AddTeacherForm from './screens/admin/AddTeacherForm';
import Header from './Header/Header';
import Login from './screens/login/register/Login';
import StudentDetail from './screens/StudentDetails/StudentDetail';
import Navbar from './screens/nav/Navbar';
import Sidebar from './screens/nav/Sidebar';
import Homepage from './screens/homepage/Homepage';
import AddSubjects from './screens/admin/AddSubjects';
import StudentData from './screens/StudentDataBatchWise';
import StudentDataElectiveBatchWise from './screens/StudentDataElectiveBatchWise';
import StudentDetailTemp from './screens/StudentDetails/Temp';
import PsoTable from './screens/PSO/PsoTable';
import CourseOutcome from './screens/Course/CourseOutcome';
import CourseObjectiveTable from './screens/Course/CourseObjective';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                  <Login onLogin={login} />
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
              path="/course-outcome"
              element={
                isAuthenticated ? (
                  <CourseOutcome />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/course-objective/:subjectdataid"
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
