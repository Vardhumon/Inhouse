import React from "react";

const CoruseArticulationTable = ({ show, data }) => {
  if (!show) return null;

//   console.log("PercentageTable data:", data); // Debugging log to check data

  return (
    <div className="container-fluid vh-100 vw-75 custom-table overflow-auto" style={{ margin: "0px", padding: "0px" }}>
    <div className="container-fluid vw-75 custom-table overflow-auto">
      <div className="container-fluid bg-light text-dark px-1 cusTable p-1 border border-3">
      <table className="table table-bordered h-100" style={{minHeight:"200px"}}>
        <thead>
            <tr>
                <th colSpan={17} className="text-center table table-primary">COURSE ARTICULATION MATRIX (PO / PSO MAPPING)</th>
            </tr>
          <tr>
            <th className="text-center align-middle" rowSpan={2}>Course Outcome</th>
            <th colSpan={12} className="text-center">Program Outcomes</th>
            <th colSpan={3} className="text-center">Program Specific Outcomes</th>
          </tr>
          <tr>
            {[...Array(12).keys()].map((index) => (
              <th className="text-center" style={{minWidth:"75px"}} key={index}>PO{index + 1}</th>
            ))}
            {[...Array(3).keys()].map((index) => (
              <th className="text-center" style={{minWidth:"75px"}}key={index}>PSO{index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((item, index) => (
              <tr key={index}>
                <td className="text-center py-2">{item.co}</td>
                {item.po.map((value, idx) => (
                  <td className="text-center" style={{minWidth:"60px"}} key={idx}>{value}</td>
                ))}
                {item.pso.map((value, idx) => (
                  <td className="text-center"  key={idx}>{value}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>

  );
};

export default CoruseArticulationTable;
