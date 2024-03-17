import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        width: "200px",
        padding: "20px",
      }}
    >
      <h2>Sidebar</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <Link to="/TeachableMachineImageModel">Image Detect</Link>
        </li>
        <li>
          <Link to="/TeachableMachineWebcam">Model 1</Link>
        </li>
        <li>
          <Link to="/model2">Model 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
