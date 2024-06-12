import React, { useState } from "react";
import PsoRow from "./PsoRow";
import axios from "axios";

const PsoTable = () => {
  const [data, setData] = useState([]);
  const [showPercentages, setShowPercentages] = useState(false);
  const [subdata, setSubData] = useState([]);

  const addRow = () => {
    const newCo = `CO${data.length + 1}`;
    const newRow = {
      co: newCo,
      po: Array(12).fill(0),
      pso: Array(3).fill(0),
    };
    setData([...data, newRow]);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const finaldata = {"data":data}
    await axios.post("http://localhost:8000/copo", data , {
      headers: {
        "Content-Type":"application/json"
      }
    } ).then(response => console.log(response.data))
    .catch(error => {
      "Something went wrong in saving co po ", error
    })
    console.log("Submitted Data:");
    console.log(finaldata);
    setShowPercentages(true);
  };

  const handleRowSave = (index, editedCo, editedPo, editedPso) => {
    const updatedData = [...data];
    updatedData[index] = { co: editedCo, po: editedPo, pso: editedPso };
    setData(updatedData);
  };

  return (
    <div className="container-fluid vh-100 vw-100 custom-table overflow-auto py-5" style={{margin: "0px", padding: "0px"}}>
      <div className="container-fluid h-80 vw-100 custom-table overflow-auto">
        <div className="container-fluid bg-light text-dark px-3 cusTable p-2 border border-3 border-danger mb-5">
          <div className="row bg-light text-dark no-wrap fs-4 d-flex justify-content-center font-weight-bold">
            <div className="col-12 col-md-2 fs-4 fw-bold border border-2 px-2 py-2 text-center">
              Course Outcome
            </div>
            <div className="col-12 col-md-8 border border-2">
              <div className="row program-outcomes d-flex justify-content-center fs-4 fw-bold Program-Outcome py-2">
                Program Outcomes (PO)
              </div>
              <div className="row px-2">
                {[...Array(12).keys()].map((index) => (
                  <div className="col px-1 fs-5 py-1 text-center" key={index}>
                    PO{index + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-md-2 border border-2 py-2">
              <div className="row program-specific-outcome text-center d-flex justify-content-center fs-5 fw-bold">
                Program Specific Outcomes
              </div>
              <div className="row">
                {[...Array(3).keys()].map((index) => (
                  <div className="col fs-5 py-3 text-center" key={index}>
                    PSO{index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Entries */}
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

          {/* Add row button */}
          <div className="row mt-3">
            <div className="col">
              <button className="btn btn-danger" onClick={addRow}>
                Add Row
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div className="row mt-3">
            <div className="col">
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Percentage Table */}
      {showPercentages && (
        <div className="container mt-5">
          {/* Display percentage table or whatever should be displayed */}
        </div>
      )}
    </div>
  );
};

export default PsoTable;
