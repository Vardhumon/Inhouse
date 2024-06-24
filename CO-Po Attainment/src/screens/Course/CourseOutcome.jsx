import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const fetchData = async (subdataid) => {
    const response = await fetch(`http://localhost:8000/course-outcome/${subdataid}`);
    const outcome = await response.json();
    console.log(outcome);
    return outcome;
};

function CourseOutcome() {
    const [data, setData] = useState([]);
    const { subname, subjectdataid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const outcome = await fetchData(subjectdataid);
                const formattedData = outcome.co.map((co, index) => ({
                    co: co,
                    outcome: outcome.outcome[index]
                }));
                setData(formattedData);
                setEditedData([...formattedData]); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAsync();
    }, [subname, subjectdataid]);

    const [editMode, setEditMode] = useState(false); 
    const [editIndex, setEditIndex] = useState(null);
    const [editedData, setEditedData] = useState([]);

    useEffect(() => {
        setEditedData([...data]);
    }, [data]);

    const handleEditAll = () => {
        if (!editMode) {
            // Enable edit mode
            setEditIndex(null); 
            setEditMode(true);
        } else {
            // Save changes
            setEditMode(false);
            setData([...editedData]); 
        }
    };

    const handleEdit = (index) => {
        if (editMode) {
            setEditIndex(index);
        }
    };

    const handleInputChange = (event, index, field) => {
        if (editMode) {
            const newData = [...editedData];
            newData[index][field] = event.target.value;
            setEditedData(newData);
        }
    };

    const submitData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/course-outcome/${subjectdataid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ co: editedData.map(item => item.co), outcome: editedData.map(item => item.outcome) }),
            });
            if (response.ok) {
                toast.success('Outcomes submitted successfully');
            } else {
                toast.error('Failed to submit outcomes');
            }
        } catch (error) {
            console.error('Error submitting outcomes:', error);
            toast.error('Error submitting outcomes');
        }
    };

    const navigateToCourseObjectives = () => {
        navigate(`/${subname}/course-objective/${subjectdataid}`);
    };

    const navigateToPSOTable = () => {
        navigate(`/${subname}/pso-table/${subjectdataid}`);
    };

    return (
        <div className="m-5 py-4 w-80 h-100 my-4 d-flex flex-column">
            <table className="table table-bordered">
                <thead className="bg-success text-white text-center table-primary">
                    <tr>
                        <th scope="col-5" className="col-2 fs-4">CO</th>
                        <th scope="col-7" className="col-10 align-middle fs-4">Course Outcomes (CO's)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="align-middle text-center fs-5">
                                {editIndex === index || editMode ? (
                                    <input
                                        type="text"
                                        className="form-control d-inline w-50"
                                        value={editedData[index].co}
                                        onChange={(event) => handleInputChange(event, index, 'co')}
                                    />
                                ) : (
                                    <span className='fs-5'>{item.co}</span>
                                )}
                            </td>
                            <td className="align-middle">
                                {editIndex === index || editMode ? (
                                    <input
                                        type="text"
                                        className="form-control fs-5"
                                        value={editedData[index].outcome}
                                        onChange={(event) => handleInputChange(event, index, 'outcome')}
                                    />
                                ) : (
                                    <span className='fs-5'>{item.outcome}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between position-fixed bottom-0 start-0 m-4">
                <button className='btn btn-warning me-2' onClick={handleEditAll}>
                    {editMode ? 'Save All Changes' : 'Edit All'}
                </button>
                <button className='btn btn-success' onClick={submitData}>Submit</button>
            </div>
           <div className='d-flex position-fixed bottom-0 end-0 m-4 justify-content-between'>
           <button className='btn btn-secondary me-2' onClick={navigateToCourseObjectives}>
            Back to Course Objectives
            </button>
            <button className='btn btn-primary' onClick={navigateToPSOTable}> Go to PSO Table</button>
           </div>
        </div>
    );
}

export default CourseOutcome;
