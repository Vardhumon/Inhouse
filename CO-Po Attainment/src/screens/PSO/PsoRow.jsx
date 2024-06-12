import React, { useState } from "react";

function PsoRow({ index, co, po, pso, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCo, setEditedCo] = useState(co);
  const [editedPo, setEditedPo] = useState(po);
  const [editedPso, setEditedPso] = useState(pso);

  const handleSave = () => {
    onSave(index, editedCo, editedPo, editedPso);
    setIsEditing(false);
  };

  return (
    <div className="row border" style={{ display: "flex" }}>
      <div className="col-12 col-md-2 ps-4 py-2 fs-5 pe-1 d-flex align-items-center justify-content-center">
      {isEditing ? (
          <button className="btn btn-secondary" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        {isEditing ? (
          <input
            type="text"
            style={{width:"100px", marginLeft:"5px"}}
            value={editedCo}
            onChange={(e) => setEditedCo(e.target.value)}
            className="ms-2"
          />
        ) : (
          co
        )}
      </div>
      <div className="col-12 col-md-8 px-4 pe-1 fs-5">
        <div className="row p-2">
          {isEditing ? (
            editedPo.map((item, index) => (
              <div className="col text-center" key={index}>
                <input
                  type="number"
                  min={0}
                  value={item}
                  onChange={(e) => {
                    const newPo = [...editedPo];
                    newPo[index] = parseInt(e.target.value, 10);
                    setEditedPo(newPo);
                  }}
                  style={{ width: "40px" }}
                />
              </div>
            ))
          ) : (
            po.map((item, index) => (
              <div className="col text-center" key={index}>
                {item}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="col-12 col-md-2 py-2 ps-5 px-1 fs-5">
        <div className="row">
          {isEditing ? (
            editedPso.map((item, index) => (
              <div className="col text-center" key={index}>
                <input
                  type="number"
                  value={item}
                  min={0}
                  onChange={(e) => {
                    const newPso = [...editedPso];
                    newPso[index] = parseInt(e.target.value, 10);
                    setEditedPso(newPso);
                  }}
                  style={{ width: "40px" }}
                />
              </div>
            ))
          ) : (
            pso.map((item, index) => (
              <div className="col" key={index}>
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PsoRow;
