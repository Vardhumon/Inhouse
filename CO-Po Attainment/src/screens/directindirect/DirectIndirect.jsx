import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MiscTable from "../../miscTables/MiscTable";
import { DirectPOAttainment } from "../../../../backend/models/directAttainPo";
import DirectPoTable from "./DirectPO";
import IndirectPO from "./IndirectPO";
import FinalCoPoPso from "./FinalCoPoPso";
import toast from "react-hot-toast";

const EditableTable = () => {
  const initialData = {
    courseOutcome: " default Values get from Course End Survey",
    CO1: 0,
    CO2: 0,
    CO3: 0,
    CO4: 0,
    CO5: 0,
    CO6: 0
  };
  const {subjectdataid,subname}=useParams();

  const [Data, setData] = useState(initialData);
  const [directdata,setdirectdata] = useState();
  const [indirectdata,setIndirectData] = useState();
  const [finaldata,setfinaldata] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [refreshdata,setRefreshData] =useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "courseOutcome" ? value : parseFloat(value)
    }));
  };

  useEffect(() => {
    const fetchdata = async(subjectdataid) => {
        try {
            const response = await axios.get(`http://localhost:8000/direct-indirect/${subjectdataid}`)
            console.log(response);
            const {data} = response;
            const {indirectPo} = data;
            const {values} = indirectPo
            console.log(Data.courseOutcome);
            if(Data.courseOutcome === ' default Values get from Course End Survey'){
            setData({courseOutcome:"Values get from Course End Survey", CO1:values[0],CO2:values[1],CO3:values[2],CO4:values[3],CO5:values[4],CO6:values[5]})
            }
            setdirectdata(data["directPoAttainment"])
            setIndirectData(data["indirectPo"]);
            setfinaldata(data["finalCoPoPso"])
            // console.log(indirectdata);
        } catch (error) {
            console.error(error)
        }
    }
    fetchdata(subjectdataid);
    
  },[refreshdata] )
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSavedData(Data);
  };

  const handleSubmit = async () => {
    const payload = {
      values: [
        Data.CO1,
        Data.CO2,
        Data.CO3,
        Data.CO4,
        Data.CO5,
        Data.CO6
      ]
    };
    console.log(payload);
    try {
      const response = await axios.post(`http://localhost:8000/direct-indirect/${subjectdataid}`, payload);
      // console.log("Data submitted successfully:", response.data);
      if(response.status===200){
        toast.success("Data Submitted Succesfully")
        setRefreshData(!refreshdata);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const columns = ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6"];

  return (
    <div className="p-5">
        <DirectPoTable data={directdata}/>
      <table className="table table-bordered py-3 vw-50">
        <thead>
          <tr>
            <th colSpan={2}>Course Outcome</th>
            {columns.map((col, index) => (
              <th key={index} style={{ minWidth: "100px" }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              <span>{Data.courseOutcome}</span>
              {isEditing ? (
                <button className="btn btn-success ms-2" onClick={handleSave}>Save</button>
              ) : (
                <button className="btn btn-primary ms-2" onClick={handleEdit}>Edit</button>
              )}
            </td>
            {columns.map((col, index) => (
              <td key={index}>
                {isEditing ? (
                  <input
                    min={0}
                    style={{ maxWidth: "80px" }}
                    type="number"
                    name={col}
                    value={Data[col]}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{Data[col]}</span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
      <IndirectPO data={indirectdata}/> 
      <FinalCoPoPso data={finaldata}/>

    </div>
  );
};

export default EditableTable;
