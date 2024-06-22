import React from 'react'

function IndirectPO({data}) {
    // console.log(data);
    if (!data) return null; 
    return (
        <div className="overflow-auto mt-4 mb-5" style={{ margin: "0px", padding: "0px" }}>
          <div className="vw-75  overflow-auto">
            <div className=" bg-light text-dark px-4 py-3 border border-3">
              <table className="table table-bordered h-75" style={{ minHeight: "200px" }}>
                <thead>
                  <tr>
                    <th rowSpan={2} colSpan ={4}className="text-center align-middle">Course Outcomes</th>
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
                    data.data.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center" colSpan={4}>{item.co}</td>
                        {item.po.map((value, idx) => (
                          <td className="text-center" style={{ minWidth: "60px" }} key={idx}>{value}</td>
                        ))}
                        {item.pso.map((value, idx) => (
                          <td className="text-center" key={idx}>{value}</td>
                        ))}
                      </tr>
                    ))}
                    {
                        data.averages.map((item,index) => (
                            <tr key={index}>
                        <td className="text-center" colSpan={4}>Averages</td>
                        {item.po.map((value, idx) => (
                          <td className="text-center" style={{ minWidth: "60px" }} key={idx}>{value}</td>
                        ))}
                        {item.pso.map((value, idx) => (
                          <td className="text-center" key={idx}>{value}</td>
                        ))}
                            </tr>
                        ))
                    }     
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
}

export default IndirectPO