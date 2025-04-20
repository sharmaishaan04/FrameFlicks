import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const Body = () => {
  return (
    <div className="relative">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Browse />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Body;
