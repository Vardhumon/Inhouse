import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MiscTable from '../../miscTables/MiscTable';

function AttainmentTables() {
    const [data,setData] =useState(false);
    const {subjectdataid,subname,batchYear}=useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async(subjectdataid) => {
            try {
                const response = await axios.get(`http://localhost:8000/attainment-tables/${subjectdataid}`)
                console.log(response);
                if(response.status===200){
                    setData(response.data);
                }
            } catch (error) {
             console.error(error)   
            }
        }
        fetchData(subjectdataid);
    }, [])

    const navigateToDirectIndirect =() =>{
        navigate(`/${batchYear}/${subname}/direct-indirect/${subjectdataid}`)
    }
    const navigateToStudentDetails =() =>{
        navigate(`/${batchYear}/${subname}/student-detail/${subjectdataid}`)
    }
    
  return (
    <div>
           ${!data? <div className='text-center align-middle vh-100'>Loading</div>:<div>
        <MiscTable data={data["ueAttainmentTable"]} />
        <MiscTable data={data["coAttainmentTable"]} />

    </div>}
    <div className='d-flex justify-content-end'> 
    <button className='btn btn-secondary m-2 me-4 mt-3' onClick={navigateToStudentDetails} >Go To Student Details</button>
    <button className='btn btn-primary m-2 mt-3'onClick={navigateToDirectIndirect}>Go To Direct/Indirect Attainment</button>
    </div>
    </div>   
  )
}

export default AttainmentTables