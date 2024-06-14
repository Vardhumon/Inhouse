import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const fetchData = async () => {
    const response = await fetch('http://localhost:8000/courseoutcomes'); 
    const outcome = await response.json();
    console.log(outcome);
    return outcome;
};

function CourseOutcome() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const outcome = await fetchData();
                const formattedData = outcome.co.map((co, index) => ({
                    co: co,
                    outcome: outcome.outcome[index]
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAsync();
    }, []);

    const [editIndex, setEditIndex] = useState(null);
    const [editedData, setEditedData] = useState([]);

    useEffect(() => {
        setEditedData([...data]);
    }, [data]);

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedData([...data]);
    };

    const handleInputChange = (event, index, field) => {
        const newData = [...editedData];
        newData[index][field] = event.target.value;
        setEditedData(newData);
    };

    const handleSave = (index) => {
        setEditIndex(null);
        setData([...editedData]); 
    };

    return (
        <div className="container py-4 w-100 h-100 fs-4 my-4">
            <table className="table table-bordered">
                <thead className="bg-success text-white text-center">
                    <tr>
                        <th scope="col-5" className="col-2">CO</th>
                        <th scope="col-7" className="col-10">Course Outcomes (CO's)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="align-middle text-center fs-5">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        className="form-control d-inline w-50"
                                        value={editedData[index].co}
                                        onChange={(event) => handleInputChange(event, index, 'co')}
                                    />
                                ) : (
                                    <span className='fs-5'>{item.co}</span>
                                )}
                                <button
                                    className={`btn btn-sm ${editIndex === index ? 'btn-success' : 'btn-light border border-3'} ms-2`}
                                    onClick={() => editIndex === index ? handleSave(index) : handleEdit(index)}
                                >
                                    {editIndex === index ? 'Save' : 'Edit'}
                                </button>
                            </td>
                            <td className="align-middle">
                                {editIndex === index ? (
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
        </div>
    );
}

export default CourseOutcome;
