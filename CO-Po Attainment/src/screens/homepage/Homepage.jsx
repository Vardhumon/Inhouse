import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Cookies from 'js-cookie';

const Homepage = () => {
  const [subjects, setSubjects] = useState([]);
  const [batchYear, setBatchYear] = useState('2021-25');
  const [subjectsFetched, setSubjectsFetched] = useState(true);
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
      setSubjectsFetched(true);
    } catch (error) {
      setSubjects([]);
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

  const cardStyle = {
    width: '15rem',
    height: '13rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const cardBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  };

  return (
    <div className="container vw-100 vh-100 p-4">
      <DropdownButton
        id="dropdown-basic-button"
        title={batchYear}
        onSelect={handleSelect}
        className='mb-3 ms-2'
      >
        <Dropdown.Item eventKey="2021-25">2021-25</Dropdown.Item>
        <Dropdown.Item eventKey="2022-26">2022-26</Dropdown.Item>
        <Dropdown.Item eventKey="2023-27">2023-27</Dropdown.Item>
      </DropdownButton>

      <div className="d-flex flex-wrap">
        {subjectsFetched ? (
          subjects.length > 0 ? (
            subjects.map(subject => (
              <Card key={subject[0].subject_data_id} className="m-2" style={cardStyle}>
                <Card.Body style={cardBodyStyle}>
                  <div>
                    <Card.Title>{subject[0].subject_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{subject[0].subject_code}</Card.Subtitle>
                  </div>
                  <Button variant="primary" onClick={() => handleCardClick(subject[0].subject_data_id, subject[0].subject_name)}>
                    View Course Objectives
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="m-2">No relevant subjects found</div>
          )
        ) : (
          <div className="m-2 border rounded p-4">No Relevant Subjects Found .</div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
