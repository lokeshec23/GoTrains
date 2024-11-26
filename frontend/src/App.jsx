import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forget from "./pages/Forget";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
