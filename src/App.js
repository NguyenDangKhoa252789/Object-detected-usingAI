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
                <Link to="/">Image Detect</Link>
              </li>
              <li>
                <Link to="/TeachableMachineWebcam">Model 1</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<TeachableMachineImageModel />} />
            <Route
              path="/TeachableMachineWebcam"
              element={<TeachableMachineWebcam />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
