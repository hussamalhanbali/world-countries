import "./App.css";
import Navbar from "./pages/Navbar";
import React, { useState } from "react";
import Search from "./pages/Search";
import CountryCard from "./pages/CountryCard";
import CountryDetails from "./pages/CountryDetails";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode); 
  };

  return (
    <div className="App">
      <div style={{
        backgroundColor: "#f8d7da",
        color: "#721c24",
        padding: "10px",
        textAlign: "center",
        fontWeight: "bold"
      }}>This project is currently undergoing maintenance to enhance functionality and user experience. Some features may be temporarily unavailable. Thank you for your understanding and patience!</div>
      <Routes>
        <Route path="*" element={<Navbar />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/" element={<CountryCard />} />
        <Route
          path="/country/:countryCode"
          component={CountryDetails}
          element={
            <CountryDetails isDarkMode={isDarkMode} toggleMode={toggleMode} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
