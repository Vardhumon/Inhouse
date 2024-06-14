import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const fetchData = async () => {
    const response = await fetch('http://localhost:8000/courseobjective');
    const objective = await response.json();
    return objective;
};

function CourseObjectiveTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const outcome = await fetchData();
                const formattedData = outcome["objectives"];
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

    const handleInputChange = (event, index) => {
        const newData = [...editedData];
        newData[index] = event.target.value;
        setEditedData(newData);
    };

    const handleSave = (index) => {
        setEditIndex(null);
        setData([...editedData]); 
    };

    return (
        <div className="container py-4 w-100 h-50">
            <table className="table table-bordered">
                <thead className="bg-danger text-white text-center">
                    <tr>
                        <th scope="col" className="col-2">Sr.No</th>
                        <th scope="col" className="col-10">Course Objectives</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="align-middle text-center">
                                <span className='fs-5'>{index + 1}</span>
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
        </div>
    );
}

export default CourseObjectiveTable;
