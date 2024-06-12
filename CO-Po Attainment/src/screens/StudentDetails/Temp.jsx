import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const fetchStudentDetails = async () => {
    const response = await fetch('http://localhost:8000/get'); // Replace with your API endpoint
    const backendData = await response.json();
    return backendData;
};

const fetchBackendData = async () => {
    const response = await fetch('http://localhost:8000/getbatchstudentdata'); // Replace with your API endpoint
    const studentDetails = await response.json();
    const stuarr = studentDetails.studentdata.flat();
    console.log("imp", stuarr);
    return stuarr;
};

function StudentDetailTemp() {
    const [students, setStudents] = useState([]);
    const [backendStudents, setBackendStudents] = useState([]);
    const [studentDetails, setStudentDetails] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [totals, setTotals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const backendData = await fetchStudentDetails();
                const studentdata = await fetchBackendData();
                setBackendStudents(backendData);
                console.log(backendData);
                setStudentDetails(studentdata);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchDataWithDelay = () => {
            setTimeout(fetchData, 1000); // Delay of 1 second
        };

        fetchDataWithDelay();
    }, []);

    useEffect(() => {
        if (studentDetails.length) {
            const formattedStudents = studentDetails.map((student, index) => {
                const backendStudent = backendStudents.filter(backendstudent => student.roll_number === backendstudent.roll_number) || {};
                console.log(backendStudent);
                const co_attain_UE = backendStudent[0].co_attain_UE || {};
                const co_attain_IE_CW = backendStudent[0].co_attain_IE_CW || {};

                return {
                    name: student.name,
                    roll: student.roll_number,
                    prn: student.prn_number,
                    ese: co_attain_UE.ESE,
                    midsem: co_attain_UE.MidSem,
                    pr_or: co_attain_UE.PR_OR,
                    termwork: co_attain_UE.TermWork,
                    CO1: [co_attain_IE_CW.CO1?.UT1, co_attain_IE_CW.CO1?.CW],
                    CO2: [co_attain_IE_CW.CO2?.UT1, co_attain_IE_CW.CO2?.CW],
                    CO3: [co_attain_IE_CW.CO3?.UT2, co_attain_IE_CW.CO3?.CW],
                    CO4: [co_attain_IE_CW.CO4?.UT2, co_attain_IE_CW.CO4?.CW],
                    CO5: [co_attain_IE_CW.CO5?.CW],
                    CO6: [co_attain_IE_CW.CO6?.CW]
                };
            });
            console.log("hello1 ",formattedStudents);
            setStudents(formattedStudents);
        }
    }, [backendStudents, studentDetails]);

    useEffect(() => {
        calculateAllTotals();
    }, [students]);

    const calculateTotal = (student) => {
        const total = parseInt(student.ese) + parseInt(student.midsem) + parseInt(student.pr_or) + parseInt(student.termwork);
        return isNaN(total) ? 0 : total;
    };

    const calculateCOTotal = (CO) => {
        const total = CO.length > 1 ? (parseInt(CO[0]) || 0) + (parseInt(CO[1]) || 0) : (parseInt(CO[0]) || 0);
        return isNaN(total) ? 0 : total;
    };

    const calculateAllTotals = () => {
        const newTotals = students.map(student => ({
            total: calculateTotal(student),
            totalCO1: calculateCOTotal(student.CO1),
            totalCO2: calculateCOTotal(student.CO2),
            totalCO3: calculateCOTotal(student.CO3),
            totalCO4: calculateCOTotal(student.CO4),
            totalCO5: calculateCOTotal(student.CO5),
            totalCO6: calculateCOTotal(student.CO6),
        }));
        setTotals(newTotals);
    };

    const handleInputChange = (index, field, subIndex, value) => {
        const newStudents = [...students];
        if (subIndex !== undefined) {
            newStudents[index][field][subIndex] = parseInt(value) || 0;
        } else {
            newStudents[index][field] = value;
        }
        setStudents(newStudents);
    };

    const handleSave = () => {
        setEditIndex(null);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleAllRowsSubmit = async (event) => {
        event.preventDefault();
        const StudentDetails = students.map((student, index) => ({
            ...student,
            total: totals[index]?.total || 0,
            co1: { UT1: student.CO1[0], CW: student.CO1[1], Total: totals[index]?.totalCO1 || 0 },
            co2: { UT1: student.CO2[0], CW: student.CO2[1], Total: totals[index]?.totalCO2 || 0 },
            co3: { UT2: student.CO3[0], CW: student.CO3[1], Total: totals[index]?.totalCO3 || 0 },
            co4: { UT2: student.CO4[0], CW: student.CO4[1], Total: totals[index]?.totalCO4 || 0 },
            co5: { CW: student.CO5[0], Total: totals[index]?.totalCO5 || 0 },
            co6: { CW: student.CO6[0], Total: totals[index]?.totalCO6 || 0 }
        }));

        console.log("All Row data:", StudentDetails);

        await axios.post('http://localhost:8000/addstudent', StudentDetails, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log("Something is wrong", error);
            })
    };

    return (
        <div className='mt-5 ms-4'>
            <div className="table-container">
                <table className="table table-hover table-light table-bordered w-100 mt-5">
                    <thead className='ms-2 sticky-top'>
                        <tr className='ms-2 text-center table-danger sticky-top'>
                            <th scope="col">Sr.no</th>
                            <th scope="col" style={{ minWidth: "150px" }}>PRN No.</th>
                            <th scope="col" style={{ minWidth: "150px" }}>Roll No.</th>
                            <th scope="col" style={{ minWidth: "250px" }}>Student Name</th>
                            <th scope="col">ESE(70)</th>
                            <th scope="col">InSem(30)</th>
                            <th scope="col">PR/OR(25)</th>
                            <th scope="col">TermWork(25)</th>
                            <th scope="col">Total(150)</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO1<br />UT-1(30)</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO1<br />CW</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO1<br />Total</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO2<br />UT1</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO2<br />CW</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO2<br />Total</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO3<br />UT2</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO3<br />CW</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO3<br />Total</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO4<br />UT2</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO4<br />CW</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO4<br />Total</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO5<br />CW</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO5<br />Total</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO6<br />CW</th>
                            <th className='text-center' scope='col' style={{ minWidth: "100px" }}>CO6<br />Total</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="d-flex flex-column align-items-center">
                                        <span>{index + 1}</span>
                                        {editIndex === index ? (
                                            <button className="btn btn-success btn-sm mt-1" onClick={handleSave}>Save</button>
                                        ) : (
                                            <button className="btn btn-primary btn-sm mt-1" onClick={() => handleEdit(index)}>Edit</button>
                                        )}
                                    </div>
                                </td>
                                <td>{student.prn}</td>
                                <td>{student.roll}</td>
                                <td>{student.name}</td>
                                {['ese', 'midsem', 'pr_or', 'termwork'].map((field) => (
                                    <td key={field}>
                                        {editIndex === index ? (
                                            <input
                                                type="number"
                                                className="form-control form-control-sm"
                                                value={student[field] || ''}
                                                onChange={(e) => handleInputChange(index, field, undefined, e.target.value)}
                                                style={{ maxWidth: "150px" }}
                                            />
                                        ) : (
                                            <span>{student[field]}</span>
                                        )}
                                    </td>
                                ))}
                                <td>{totals[index]?.total}</td>
                                {['CO1', 'CO2', 'CO3', 'CO4'].map((coField, i) => (
                                    <React.Fragment key={i}>
                                        {[0, 1].map((subIndex) => (
                                            <td key={subIndex}>
                                                {editIndex === index ? (
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-sm"
                                                        value={student[coField][subIndex] || ''}
                                                        onChange={(e) => handleInputChange(index, coField, subIndex, e.target.value)}
                                                        style={{ maxWidth: "100px" }}
                                                    />
                                                ) : (
                                                    <span>{student[coField][subIndex]}</span>
                                                )}
                                            </td>
                                        ))}
                                        <td>{totals[index]?.[`totalCO${i + 1}`]}</td>
                                    </React.Fragment>
                                ))}
                                {['CO5', 'CO6'].map((coField, i) => (
                                    <React.Fragment key={i + 4}>
                                        <td>
                                            {editIndex === index ? (
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    value={student[coField][0] || ''}
                                                    onChange={(e) => handleInputChange(index, coField, 0, e.target.value)}
                                                    style={{ maxWidth: "100px" }}
                                                />
                                            ) : (
                                                <span>{student[coField][0]}</span>
                                            )}
                                        </td>
                                        <td>{totals[index]?.[`totalCO${i + 5}`]}</td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={handleAllRowsSubmit}>Submit All Rows</button>
            </div>
        </div>
    );
}

export default StudentDetailTemp;
