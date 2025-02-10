import { Routes, Route, Router } from "react-router-dom";
import Home from "./Components/home.js";
import Login from "./Components/login.js";
import React from "react";


function App() {
  
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
