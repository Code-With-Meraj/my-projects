import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import NextPage from "./components/NextPage";
import "./App.css";

const Form = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/next-page" element={<NextPage />} />
        
      </Routes>
    </Router>
  );
};

export default Form;
