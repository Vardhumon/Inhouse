import React, { useEffect, useState } from "react";
import PsoRow from "./PsoRow";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import PercentageTable from "./PercTable";
import CoruseArticulationTable from "./CourseArtTable";

const PsoTable = () => {
  const [data, setData] = useState([]);
  const [percdata, setPercData] = useState([]);
  const [artdata, setArtData] = useState([]);

  const [showPercentages, setShowPercentages] = useState(false);
  const { subjectdataid } = useParams();
  const [alt, setAlt] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/CoPoPsoTable/${subjectdataid}`);
      setData(response.data.data);
      setPercData(response.data.data2);
      setArtData(response.data.data3)
      console.log("Fetched percdata:", response.data.data3); // Debugging log to check fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [alt]);

  const addRow = () => {
    const newCo = `CO${data.length + 1}`;
    const newRow = {
      co: newCo,
      po: Array(12).fill(0),
      pso: Array(3).fill(0),
    };
    setData([...data, newRow]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const finaldata = { data };
      const response = await axios.post(`http://localhost:8000/CoPoPsoTable/${subjectdataid}`, finaldata, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        toast.success('Outcomes submitted successfully');
        setAlt(!alt);
        setShowPercentages(true);
      } else {
        toast.error('Failed to submit outcomes');
      }
    } catch (error) {
      console.error('Error submitting outcomes:', error);
      toast.error('Error submitting outcomes');
    }
  };

  const handleRowSave = (index, editedCo, editedPo, editedPso) => {
    const updatedData = [...data];
    updatedData[index] = { co: editedCo, po: editedPo, pso: editedPso };
    setData(updatedData);
  };

  return (
    <div className="container-fluid vh-100 vw-100 custom-table overflow-auto pt-3" style={{ margin: "0px", padding: "0px" }}>
      <div className="container-fluid h-80 vw-75 custom-table overflow-auto">
        <div className="container-fluid bg-light text-dark  cusTable p-2 border border-3 mb-5">
          <table className="table table-bordered">
            <thead>
            <tr>
                <th colSpan={17} className="text-center table table-primary">TOTAL COUNT OF PERFORMANCE INDICATOR FOR CO-PO/ PSO MAPPING</th>
            </tr>
              <tr>
              <th className="text-center align-middle " rowSpan={2}>Course Outcome</th>
                <th colSpan={12} className="text-center">Program Outcome</th>
                <th colSpan={3} className="text-center" >Program Specific Outcomes</th>
              </tr>
              <tr>
                {[...Array(12).keys()].map((index) => (
                  <th className="text-center" key={index} style={{minWidth:"80px"}}>PO{index + 1}</th>
                ))}
                {[...Array(3).keys()].map((index) => (
                  <th className="text-center" style={{minWidth:"70px"}} key={index}>PSO{index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((item, index) => (
                  <PsoRow
                    key={index}
                    index={index}
                    co={item.co}
                    po={item.po}
                    pso={item.pso}
                    onSave={handleRowSave}
                  />
                ))}
            </tbody>
          </table>
          {/* <div className="row mt-3">
            <div className="col">
              <button className="btn btn-danger" onClick={addRow}>Add Row</button>
            </div>
          </div> */}
          <div className="row mt-3">
            <div className="col">
              <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <PercentageTable key={alt} show={showPercentages} data={percdata} />
      <CoruseArticulationTable show={showPercentages} data={artdata}/>
    </div>
  );
};

export default PsoTable;
