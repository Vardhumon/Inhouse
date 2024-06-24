import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentDataElectiveBatchWise() {
    const [selectedBatchYear, setSelectedBatchYear] = useState('Select Batch Year');
    const [totalA, setTotalA] = useState(0);
    const [totalB, setTotalB] = useState(0);
    const [studentNamesA, setStudentNamesA] = useState('');
    const [prnNumbersA, setPrnNumbersA] = useState('');
    const [studentNamesB, setStudentNamesB] = useState('');
    const [prnNumbersB, setPrnNumbersB] = useState('');
    const [studentsA, setStudentsA] = useState([]);
    const [studentsB, setStudentsB] = useState([]);

    const handleSelect = (eventKey) => {
        setSelectedBatchYear(eventKey);
    };

    const handleAdivStudents = (event) => {
        setTotalA(event.target.value);
    };

    const handleBdivStudents = (event) => {
        setTotalB(event.target.value);
    };

    const handleStudentNamesAChange = (event) => {
        setStudentNamesA(event.target.value);
    };

    const handlePrnNumbersAChange = (event) => {
        setPrnNumbersA(event.target.value);
    };

    const handleStudentNamesBChange = (event) => {
        setStudentNamesB(event.target.value);
    };

    const handlePrnNumbersBChange = (event) => {
        setPrnNumbersB(event.target.value);
    };

    const handleSubmit = () => {
        const namesArrayA = studentNamesA.trim().split('\n');
        const prnArrayA = prnNumbersA.trim().split('\n');
        const namesArrayB = studentNamesB.trim().split('\n');
        const prnArrayB = prnNumbersB.trim().split('\n');

        if (namesArrayA.length !== prnArrayA.length || namesArrayB.length !== prnArrayB.length) {
            console.error('The number of student names and PRN numbers must be the same for both A and B divisions');
            return;
        }

        const studentObjectsA = namesArrayA.map((name, index) => ({
            roll_number: `TEAIDB${String(index + 1).padStart(2, '0')}`,
            name: name.trim(),
            prn_number: prnArrayA[index].trim()
        }));

        const studentObjectsB = namesArrayB.map((name, index) => ({
            roll_number: `TEBIDB${String(index + 1).padStart(2, '0')}`,
            name: name.trim(),
            prn_number: prnArrayB[index].trim()
        }));

        const batchData = {
            batch_year: selectedBatchYear,
            students: {
                A: studentObjectsA,
                B: studentObjectsB
            }
        };

        console.log('Batch Data:', batchData);
    };

    return (
        <div className='vw-100 vh-100 d-flex flex-column align-items-center justify-content-start pt-5'>
            <div className='mb-3  mx-auto'>
                <div className='text-center m-2 fs-4'>Enter The Batch Year</div>
                <DropdownButton
                    id="dropdown-basic-button"
                    title={selectedBatchYear}
                    onSelect={handleSelect}
                    className='w-75 ms-5 mx-auto'
                >
                    <Dropdown.Item eventKey="2021-25">2021-25</Dropdown.Item>
                    <Dropdown.Item eventKey="2022-26">2022-26</Dropdown.Item>
                    <Dropdown.Item eventKey="2023-27">2023-27</Dropdown.Item>
                    <Dropdown.Item eventKey="2024-28">2024-28</Dropdown.Item>
                </DropdownButton>
            </div>

            <div className='w-75'>
                <div className='card p-3 mb-3'>
                    <h2 className='text-center'>A Division</h2>
                    <div className='form-group'>
                        Enter Total A Div Student:
                        <input
                            type='number'
                            max={90}
                            min={1}
                            onBlur={handleAdivStudents}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        Enter Student Names (one per line):
                        <textarea
                            rows={5}
                            onChange={handleStudentNamesAChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        Enter PRN Numbers (one per line):
                        <textarea
                            rows={5}
                            onChange={handlePrnNumbersAChange}
                            className='form-control'
                        />
                    </div>
                </div>

                <div className='card p-3 mb-3'>
                    <h2 className='text-center'>B Division</h2>
                    <div className='form-group'>
                        Enter Total B Div Student:
                        <input
                            type='number'
                            max={90}
                            min={1}
                            onBlur={handleBdivStudents}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        Enter Student Names (one per line):
                        <textarea
                            rows={5}
                            onChange={handleStudentNamesBChange}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        Enter PRN Numbers (one per line):
                        <textarea
                            rows={5}
                            onChange={handlePrnNumbersBChange}
                            className='form-control'
                        />
                    </div>
                </div>
                
                <button onClick={handleSubmit} className='btn btn-success w-100'>Submit</button>
            </div>
        </div>
    );
}

export default StudentDataElectiveBatchWise;
