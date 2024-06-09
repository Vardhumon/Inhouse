import axios from 'axios';
import React, { useState } from 'react';
import { Await } from 'react-router-dom';

function StudentData() {
    const [batchYear, setBatchYear] = useState('Select Batch Year');
    const [totalA, setTotalA] = useState(0);
    const [totalB, setTotalB] = useState(0);
    const [studentNamesA, setStudentNamesA] = useState('');
    const [prnNumbersA, setPrnNumbersA] = useState('');
    const [studentNamesB, setStudentNamesB] = useState('');
    const [prnNumbersB, setPrnNumbersB] = useState('');

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

    const handleSubmit = async(event) => {
        event.preventDefault();
        const namesArrayA = studentNamesA.trim().split('\n');
        const prnArrayA = prnNumbersA.trim().split('\n');
        const namesArrayB = studentNamesB.trim().split('\n');
        const prnArrayB = prnNumbersB.trim().split('\n');

        if (namesArrayA.length !== prnArrayA.length || namesArrayB.length !== prnArrayB.length) {
            console.error('The number of student names and PRN numbers must be the same for both A and B divisions');
            return;
        }

        const studentsA = namesArrayA.map((name, index) => ({
            name: name.trim(),
            roll_number: `TEAIDA${String(index + 1).padStart(2, '0')}`,
            prn_number: prnArrayA[index].trim()
        }));

        const studentsB = namesArrayB.map((name, index) => ({
            name: name.trim(),
            roll_number: `TEBIDB${String(index + 1).padStart(2, '0')}`,
            prn_number: prnArrayB[index].trim()
        }));

        const data = {
            batchYear: batchYear,
            studentdata:[studentsA,studentsB]
        };
        await axios.post("http://localhost:8000/batchstudentdata", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).
        then(response => {
            console.log(response.data)
        })
        .catch(error =>{
            console.log("some problem with createing student batch", error)
        })
        
    };

    return (
        <div className='w-100 vh-100 mt-5 fs-5'>
            <div>
                <div>Select Batch Year:</div>
                <select onChange={(e) => setBatchYear(e.target.value)}>
                    <option value="Select Batch Year" disabled>Select Batch Year</option>
                    <option value="2021-25">2021-25</option>
                    <option value="2022-26">2022-26</option>
                    <option value="2023-27">2023-27</option>
                    <option value="2024-28">2024-28</option>
                </select>
            </div>

            <div>
                <div>
                    <h2>A Division</h2>
                    <div>
                        Enter Total A Div Student:
                        <input
                            type='number'
                            max={90}
                            min={1}
                            onBlur={handleAdivStudents}
                        />
                    </div>
                    <div>
                        Enter Student Names (one per line):
                        <textarea
                            rows={10}
                            cols={50}
                            onChange={handleStudentNamesAChange}
                        />
                    </div>
                    <div>
                        Enter PRN Numbers (one per line):
                        <textarea
                            rows={10}
                            cols={50}
                            onChange={handlePrnNumbersAChange}
                        />
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <h2>B Division</h2>
                    <div>
                        Enter Total B Div Student:
                        <input
                            type='number'
                            max={90}
                            min={1}
                            onBlur={handleBdivStudents}
                        />
                    </div>
                    <div>
                        Enter Student Names (one per line):
                        <textarea
                            rows={10}
                            cols={50}
                            onChange={handleStudentNamesBChange}
                        />
                    </div>
                    <div>
                        Enter PRN Numbers (one per line):
                        <textarea
                            rows={10}
                            cols={50}
                            onChange={handlePrnNumbersBChange}
                        />
                    </div>
                </div>
            </div>

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default StudentData;
