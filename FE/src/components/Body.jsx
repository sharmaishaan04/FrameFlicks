import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

const Body = () => {
  return (
    <div className="relative">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Browse />}></Route>
          <Route path="/video" element={<VideoPlayer />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Body;
