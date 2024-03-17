import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TeachableMachineImageModel from "./Page/importImage";
import TeachableMachineWebcam from "./Page/webcam";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <nav>
            <ul>
              <li>
                <Link to="/TeachableMachineImageModel">Image Detect</Link>
              </li>
              <li>
                <Link to="/TeachableMachineWebcam">Model 1</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route
              path="/TeachableMachineImageModel"
              element={<TeachableMachineImageModel />}
            />
            <Route
              path="/TeachableMachineWebcam"
              element={<TeachableMachineWebcam />}
            />
            <Route path="/" element={<h2>Home</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
