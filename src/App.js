import React from "react";
import HomePage from "./components/pages/HomePage";
import CreatePage from "./components/pages/CreatePage";
import UpdatePage from "./components/pages/UpdatePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const state = useSelector((state) => ({ ...state }));
  console.log("state", state);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/add" element={<CreatePage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
