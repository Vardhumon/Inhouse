import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const fetchData = async (subdataid) => {
    const response = await fetch(`http://localhost:8000/course-objective/${subdataid}`);
    const objective = await response.json();
    console.log(objective);
    return objective;
};

function CourseObjectiveTable() {
    const [data, setData] = useState([]);
    const { subjectdataid, subname } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const outcome = await fetchData(subjectdataid);
                const formattedData = outcome.objectives;
                setData(formattedData);
                setEditedData([...formattedData]); // Initialize editedData
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAsync();
    }, [subjectdataid]);

    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState([]);

    useEffect(() => {
        setEditedData([...data]);
    }, [data]);

    const handleEditAll = () => {
        if (!editMode) {
            // Enable edit mode
            setEditMode(true);
        } else {
            // Save changes
            setEditMode(false);
            setData([...editedData]);
        }
    };

    const handleInputChange = (event, index) => {
        if (editMode) {
            const newData = [...editedData];
            newData[index] = event.target.value;
            setEditedData(newData);
        }
    };

    const submitData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/courseobj/${subjectdataid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ objectives: editedData }),
            });
            if (response.ok) {
                toast.success('Objectives submitted successfully');
            } else {
                toast.error('Failed to submit objectives');
            }
        } catch (error) {
            console.error('Error submitting objectives:', error);
            toast.error('Error submitting objectives');
        }
    };

    const navigateToCourseOutcome = () => {
        navigate(`/${subname}/course-outcome/${subjectdataid}`);
    };
    const navigateToDashboard = () => {
        navigate(`/`);
    };

    return (
        <div className="m-4 py-4">
            <table className="table table-bordered">
                <thead className="bg-danger text-white text-center">
                    <tr className='table-primary'>
                        <th scope="col" className="col-2 fs-4 align-middle">Sr.No</th>
                        <th scope="col" className="col-10 fs-4 align-middle">Course Objectives</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="align-middle text-center">
                                <span className='fs-5'>{index + 1}</span>
                            </td>
                            <td className="align-middle">
                                {editMode ? (
                                    <input
                                        type="text"
                                        className="form-control fs-5"
                                        value={editedData[index]}
                                        onChange={(event) => handleInputChange(event, index)}
                                    />
                                ) : (
                                    <span className='fs-5'>{item}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex flex-column flex-md-row justify-content-between fixed-bottom bg-white p-3">
                <div className="d-flex justify-content-start">
                    <button className='btn btn-warning me-2 mb-2 mb-md-0' onClick={handleEditAll}>
                        {editMode ? 'Save All Changes' : 'Edit All'}
                    </button>
                    <button className='btn btn-success' onClick={submitData}>Submit</button>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='btn btn-secondary me-2 mb-2 mb-md-0' onClick={navigateToDashboard}>
                        Back to Dashboard
                    </button>
                    <button className='btn btn-primary' onClick={navigateToCourseOutcome}>
                        Go to Course Outcome
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseObjectiveTable;
