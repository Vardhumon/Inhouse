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
    <tr className="text-center align-middle">
      <td className="text-center align-middle">
        {isEditing ? (
          <>
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
            <input
              type="text"
              value={editedCo}
              onChange={(e) => setEditedCo(e.target.value)}
              style={{ width: "100px", marginLeft: "5px" }}
            />
          </>
        ) : (
          <>
            <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            {co}
          </>
        )}
      </td>
      {isEditing ? (
        editedPo.map((item, index) => (
          <td className="text-center align-middle" key={index}>
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
          </td>
        ))
      ) : (
        po.map((item, index) => (
          <td className="text-center align-middle" key={index}>
            {item}
          </td>
        ))
      )}
      {isEditing ? (
        editedPso.map((item, index) => (
          <td className="text-center align-middle" key={index}>
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
          </td>
        ))
      ) : (
        pso.map((item, index) => (
          <td className="text-center align-middle" key={index}>
            {item}
          </td>
        ))
      )}
    </tr>
  );
}

export default PsoRow;
