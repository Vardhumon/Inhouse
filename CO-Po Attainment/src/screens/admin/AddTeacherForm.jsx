import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddTeacherForm.css'; // Assuming you have a CSS file to import

function AddTeacherForm() {

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
        name: '',
        email: '',
        password: '',
        isAdmin: false,
        subjects: []
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const handleChangeadmin = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value==='on'?true:false
        });
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const [code, name] = value.split(':');

        if (checked) {
            setFormData(prevFormData => ({
                ...prevFormData,
                subjects: [...prevFormData.subjects, { code, name }]
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                subjects: prevFormData.subjects.filter(subject => subject.code !== code)
            }));
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:8000/addteacher', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was a problem with your Axios request:', error);
            });
    };

    return (
        <div className="">
            <form className="border p-4 rounded shadow" onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="name" className="fs-4">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" onChange={handleChange} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email" className="fs-4">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={handleChange} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password" className="fs-4">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={handleChange} />
                </div>
                <div className="form-check my-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="isAdmin"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChangeadmin}
                    />
                    <label className="form-check-label" htmlFor="isAdmin">
                        Admin Privileges
                    </label>
                </div>
                <div className="my-4">
                    <h2 className="fs-4">Select Subjects</h2>
                    <div className="row">
                        {[subjectsSemIII, subjectsSemIV, subjectsSemV, subjectsSemVI].map((subjects, semesterIndex) => (
                            <div className="col-md-6 col-lg-3 mb-3" key={semesterIndex}>
                                <div className="border rounded p-3 bg-white">
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
                <div className='mt-3 w-100 d-flex justify-content-start'>
                <button type="submit" className="btn btn-primary rounded-l w-25 fs-5">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddTeacherForm;
