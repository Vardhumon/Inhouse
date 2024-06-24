import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Homepage = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [batchYear, setBatchYear] = useState('2021-25');
  const [subjectsFetched, setSubjectsFetched] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || Cookies.get('email');
  console.log(Cookies.get('email'));

  const fetchSubjects = async (year) => {
    try {
      const token = Cookies.get('token');
      console.log(token);
      const response = await axios.get('http://localhost:8000/findsubs', {
        params: {
          batchyear: year,
          email: email
        },
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      setSubjects(response.data);
      setFilteredSubjects(response.data); // Initialize filtered subjects
      setSubjectsFetched(true);
    } catch (error) {
      setSubjects([]);
      setFilteredSubjects([]);
      setSubjectsFetched(false);
      console.log('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects(batchYear);
  }, [batchYear, email]);

  const handleCardClick = (subjectdataid, subname) => {
    navigate(`${subname}/course-objective/${subjectdataid}`);
  };

  const handleSelect = (eventKey) => {
    setBatchYear(eventKey);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = subjects.filter(subject =>
      subject[0].subject_name.toLowerCase().includes(query) ||
      subject[0].subject_code.toLowerCase().includes(query)
    );
    setFilteredSubjects(filtered);
  };

  const sortSubjects = (subjectArray) => {
    return subjectArray.sort((a, b) => a[0].subject_code.localeCompare(b[0].subject_code));
  };

  const categorizeSubjects = (subjectsArray) => {
    const subjectsSemIII = [
      { "210241": "Discrete Mathematics" },
      { "210242": "Fundamentals of Data Structures" },
      { "210243": "Object Oriented Programming (OOP)" },
      { "210244": "Computer Graphics" },
      { "217521": "Operating Systems" },
      { "217522": "Data Structures Laboratory" },
      { "217523": "OOP and Computer Graphics Laboratory" },
      { "217524": "Operating Systems Laboratory" },
      { "217525": "Business Communication Skills" },
      { "217526": "Humanity and Social Science" },
      { "217527": "Audit Course 3" }
    ];

    const subjectsSemIV = [
      { "217528": "Statistics" },
      { "217529": "Internet of Things" },
      { "210253": "Data Structures and Algorithms" },
      { "210252": "Software Engineering" },
      { "217530": "Management Information Systems" },
      { "217531": "Internet of Things Laboratory" },
      { "217532": "Data Structures and Algorithms Laboratory" },
      { "217533": "Project Based Learning II" },
      { "210234": "Code of Conduct" },
      { "217535": "Audit Course 4" }
    ];

    const subjectsSemV = [
      { "310241": "Data Base Management Systems" },
      { "317521": "Computer Networks" },
      { "310252": "Web Technology" },
      { "310253": "Artificial Intelligence" },
      { "317523": "SoftwareLaboratory I" },
      { "317524": "CNLaboratory" },
      { "317525": "Elective I Laboratory" },
      { "317526": "Seminar and Technical Communication" },
      { "317527": "Environmental Studies" },
      { "317528": "Audit Course 5" }
    ];

    const subjectsSemVI = [
      { "317529": "Data Science" },
      { "317530": "Cyber Security" },
      { "317531": "Artificial Neural Network" },
      { "317533": "Software Laboratory II" },
      { "317534": "Software Laboratory III" },
      { "317535": "Internship" },
      { "317536": "Mini Project" },
      { "317537": "Audit Course" }
    ];

    const categorized = {
      semIII: [],
      semIV: [],
      semV: [],
      semVI: [],
      additional: []
    };

    subjectsArray.forEach(subject => {
      const subjectCode = subject[0].subject_code;
      if (subjectsSemIII.some(sub => sub[subjectCode])) {
        categorized.semIII.push(subject);
      } else if (subjectsSemIV.some(sub => sub[subjectCode])) {
        categorized.semIV.push(subject);
      } else if (subjectsSemV.some(sub => sub[subjectCode])) {
        categorized.semV.push(subject);
      } else if (subjectsSemVI.some(sub => sub[subjectCode])) {
        categorized.semVI.push(subject);
      } else {
        categorized.additional.push(subject);
      }
    });

    return categorized;
  };

  const categorizedSubjects = categorizeSubjects(sortSubjects(filteredSubjects));

  return (
    <>
      <style>
        {`
          body {
            background-color: #f8f9fa;
          }
          
          .navbar {
            background-color: #343a40;
          }
          
          .navbar-brand,
          .nav-link {
            color: #fff !important;
          }
          
          .dropdown-menu {
            background-color: #343a40;
          }
          
          .dropdown-item {
            color: #fff;
          }
          
          .dropdown-item:hover {
            background-color: #495057;
          }
          
          .card {
            border: none;
            border-radius: 10px;
            transition: transform 0.2s;
          }
          
          .card:hover {
            transform: scale(1.05);
          }
          
          .card-title {
            font-weight: bold;
          }
          
          .custom-button {
            background-color: #007bff;
            border: none;
            border-radius: 20px;
            padding: 10px 20px;
          }
          
          .custom-button:hover {
            background-color: #0056b3;
          }
          
          .container {
            padding-top: 50px;
          }
          
          .custom-card {
            width: 17.5rem; 
            height: 12rem; 
          }
          
          .custom-button {
            margin-top: auto; /* Push the button to the bottom */
          }
        `}
      </style>
      <div className="vh-100 p-4">
        <div className="mb-3 d-flex justify-content-start align-items-center">
          <h1 className="h3 color-primary m-2">Courses</h1>
          <div className="dropdown ms-2">
            <button
              className="btn btn-primary rounded dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {batchYear}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#" onClick={() => handleSelect("2021-25")}>2021-25</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleSelect("2022-26")}>2022-26</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleSelect("2023-27")}>2023-27</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleSelect("2024-29")}>2024-29</a></li>
            </ul>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by subject name or code"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {['semIII', 'semIV', 'semV', 'semVI', 'additional'].map((sem, index) => (
          <div key={index}>
            <h2 className='m-2 text-primary'>{sem.toUpperCase()}</h2>
            <div className="d-flex flex-wrap ">
              {categorizedSubjects[sem].length > 0 ? (
                categorizedSubjects[sem].map(subject => (
                  <div key={subject[0].subject_data_id} className="card m-2 shadow-sm custom-card">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">{subject[0].subject_name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{subject[0].subject_code}</h6>
                      </div>
                      <button
                        className="btn btn-primary rounded custom-button"
                        onClick={() => handleCardClick(subject[0].subject_data_id, subject[0].subject_name)}
                      >
                        View Course Objectives
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="m-2">No relevant subjects found</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Homepage;
