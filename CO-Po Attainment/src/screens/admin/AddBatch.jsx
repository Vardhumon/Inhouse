import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddTeacherForm.css'; // Using the same CSS
import toast from 'react-hot-toast';

function AddBatch() {
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

    const [formData, setFormData] = useState({
        batchyear: '',
        subjects: []
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const [subject_code, subject_name] = value.split(':');

        if (checked) {
            setFormData(prevFormData => ({
                ...prevFormData,
                subjects: [...prevFormData.subjects, { subject_code, subject_name }]
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                subjects: prevFormData.subjects.filter(subject => subject.subject_code !== subject_code)
            }));
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Dummy axios post request
        const response =await axios.post('http://localhost:8000/batch', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if(response.status === 200){
                    toast.success("Batch Created Successfully")
                }
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was a problem with your Axios request:', error);
            });

        console.log(formData);
    };

    return (
        <div>
            <h1 className="text-center mb-4">Add Batch</h1>
            <form className="border p-4 rounded shadow" onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="batchyear" className="fs-5">Batch Year</label>
                    <input type="text" className="form-control" id="batchyear" name="batchyear" placeholder="Enter Batch Year" onChange={handleChange} />
                </div>
                <div className="my-4">
                    <h2 className="fs-4">Select Subjects</h2>
                    <div className="row">
                        {[subjectsSemIII, subjectsSemIV, subjectsSemV, subjectsSemVI].map((subjects, semesterIndex) => (
                            <div className="col-md-6 col-lg-3 mb-3" key={semesterIndex}>
                                <div className="border rounded p-3">
                                    <h3 className="fs-5">Sem {semesterIndex + 3}</h3>
                                    {subjects.map((subject, index) => (
                                        <div className="form-check" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`sem${semesterIndex + 3}Sub${index}`}
                                                value={`${Object.entries(subject)[0][0]}:${Object.entries(subject)[0][1]}`}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label" htmlFor={`sem${semesterIndex + 3}Sub${index}`}>
                                                {Object.entries(subject)[0][0]}: {Object.entries(subject)[0][1]}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
            </form>
        </div>
    );
}

export default AddBatch;
