import React from "react";

const DirectPoTable = ({ data }) => {
    // console.log(data);
    const Headings =["Internal Exam","University Exam","20% of Internal Exam", "80% of University Exam","Direct PO Attainment"]
  if (!data) return null; // Handle case when data is not yet loaded

  return (
    <div className="overflow-auto mt-4 mb-5" style={{ margin: "0px", padding: "0px" }}>
      <div className="vw-75  overflow-auto">
        <div className=" bg-light text-dark px-4 py-3 border border-3">
          <table className="table table-bordered h-75" style={{ minHeight: "200px" }}>
            <thead>
              <tr>
                <th rowSpan={2} colSpan ={4}className="text-center align-middle fs-4">PO</th>
                <th colSpan={12} className="text-center">Program Outcomes</th>
                <th colSpan={3} className="text-center">Program Specific Outcomes</th>
              </tr>
              <tr>
                {[...Array(12).keys()].map((index) => (
                  <th className="text-center" style={{ minWidth: "75px" }} key={index}>PO{index + 1}</th>
                ))}
                {[...Array(3).keys()].map((index) => (
                  <th className="text-center" style={{ minWidth: "75px" }} key={index}>PSO{index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                data.InternalExam.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center" colSpan={4}>{Headings[0]}</td>
                    {item.po.map((value, idx) => (
                      <td className="text-center" style={{ minWidth: "60px" }} key={idx}>{value}</td>
                    ))}
                    {item.pso.map((value, idx) => (
                      <td className="text-center" key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              {
                data.UniversityExam.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center" colSpan={4}>{Headings[1]}</td>
                    {item.po.map((value, idx) => (
                      <td className="text-center" style={{ minWidth: "60px" }} key={idx}>{value}</td>
                    ))}
                    {item.pso.map((value, idx) => (
                      <td className="text-center" key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
                {
                data.percInternalExam.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center" colSpan={4}>{Headings[2]}</td>
                    {item.po.map((value, idx) => (
                      <td className="text-center" style={{ minWidth: "60px" }} key={idx}>{value}</td>
                    ))}
                    {item.pso.map((value, idx) => (
                      <td className="text-center" key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
                {
                data.percUniversityExam.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center" colSpan={4}>{Headings[3]}</td>
                    {item.po.map((value, idx) => (
                      <td className="text-center" style={{ minWidth: "60px" }} key={idx}>{value}</td>
                    ))}
                    {item.pso.map((value, idx) => (
                      <td className="text-center" key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
                {
                data.DirectPO.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center table-danger" colSpan={4}>{Headings[4]}</td>
                    {item.po.map((value, idx) => (
                      <td className="text-center table-danger" style={{ minWidth: "60px" }} key={idx}>{value}</td>
                    ))}
                    {item.pso.map((value, idx) => (
                      <td className="text-center table-danger" key={idx}>{value}</td>
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

export default DirectPoTable;
