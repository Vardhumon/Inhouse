import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentDataElectiveBatchWise() {
    const [selectedBatchYear, setSelectedBatchYear] = useState('Select Batch Year');
    const [batchYears, setBatchYears] = useState([]);


    useEffect(() => {
        fetchBatchYears();
    }, []);

    const fetchBatchYears = async () => {
        try {
            // API
            const response = await fetch('your_backend_endpoint');
            if (!response.ok) {
                throw new Error('Failed to fetch batch years');
            }
            const data = await response.json();
            setBatchYears(data.batchYears);
        } catch (error) {
            console.error('Error fetching batch years:', error);
        }
    };

    const handleSelect = (eventKey) => {
        setSelectedBatchYear(eventKey);
    };


    return (
        <div className='container-fluid vw-50 vh-100 d-flex flex-column align-items-center justify-content-start pt-5'>
            <div className='mb-3  mx-auto'>
                <div className='ms-3'>Enter The Batch Year</div>
                <DropdownButton
                    id="dropdown-basic-button"
                    title={selectedBatchYear}
                    onSelect={handleSelect}
                    className='w-75 ms-5 mx-auto'
                >
                    {batchYears.map((year) => (
                        <Dropdown.Item key={year} eventKey={year}>{year}</Dropdown.Item>
                    ))}
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
