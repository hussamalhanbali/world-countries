import "./App.css";
import Navbar from "./Pages/Navbar";
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
