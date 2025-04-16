import React from "react";

const EmployeeCard = ({ nodeDatum }) => {
  return (
    <div>
      <strong>{nodeDatum.name}</strong>
      <div style={{ fontSize: 12 }}>
        {nodeDatum.attributes?.designation || nodeDatum.designation}
      </div>
      <div style={{ fontSize: 11, color: "#888" }}>{nodeDatum.team}</div>
    </div>
  );
};

export default EmployeeCard;
