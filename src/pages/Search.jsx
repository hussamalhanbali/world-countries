import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        const countriesWithFlags = response.data.map((country) => ({
          ...country,
          flag: country.flag, // Assuming the flag URL is stored in the 'flags' array
        }));
        setSearchResults(countriesWithFlags);
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  const toggleSelect = () => {
    setIsSelectOpen((prevState) => !prevState);
  };

  const closeSelect = () => {
    setIsSelectOpen(false);
  };

  const inputWidth = windowWidth > 375 ? "420px" : "220px";

  const filteredResults = searchResults.filter((country) => {
    if (selectedContinent === "") {
      return country.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        country.region.toLowerCase() === selectedContinent.toLowerCase() &&
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  return (
    <div>
      <div
        className="Search-for"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "50px",
          marginLeft: "50px",
          marginRight: "50px",
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a country..."
          className="search-input"
          style={{
            height: "35px",
            width: inputWidth,
            border: "none",
            paddingLeft: "20px",
            fontSize: "x-small",
            borderStyle: "hidden",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        />

        <div
          className="custom-select"
          style={{
            position: "relative",
            width: "170px",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          <label
            htmlFor="continent"
            style={
              {
                // position: 'absolute',
                // top: 0,
                // left: '8px',
                // color: '#666',
                // pointerEvents: 'none',
              }
            }
          >
            {/* {} */}
          </label>
          <div
            className="select-value"
            onClick={toggleSelect}
            style={{
              paddingLeft: "15px",
              border: "none",
              cursor: "pointer",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              padding: "8px 8px 8px 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {selectedContinent ? selectedContinent : "Filter by Region"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10.662"
              height="6.038"
              viewBox="0 0 10.662 6.038"
              style={{ paddingRight: "8px", paddingTop: "4px" }}
            >
              <path
                id="arrow"
                d="M18053.879,155.452l4.977,4.978,4.979-4.978"
                transform="translate(-18053.525 -155.098)"
                fill="none"
                stroke="var(--arrow-stroke-color)"
                strokeWidth="1"
              />
            </svg>
          </div>
          {isSelectOpen && (
            <div
              className="options"
              onBlur={closeSelect}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                listStyle: "none",
                paddingTop: "",
                marginTop: "6px",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
                backgroundColor: "#fff",
              }}
            >
              <option
                value=""
                onClick={() => {
                  handleContinentChange({ target: { value: "" } });
                  closeSelect();
                }}
                style={{
                  padding: "15px 0px 4px 15px",
                  cursor: "pointer",
                }}
              >
                Filter by Region
              </option>
              <option
                value="africa"
                onClick={() => {
                  handleContinentChange({ target: { value: "Africa" } });
                  closeSelect();
                }}
                style={{
                  padding: "1px 0px 4px 15px",
                  cursor: "pointer",
                }}
              >
                Africa
              </option>
              <option
                value="americas"
                onClick={() => {
                  handleContinentChange({ target: { value: "Americas" } });
                  closeSelect();
                }}
                style={{ padding: "1px 0px 4px 15px", cursor: "pointer" }}
              >
                Americas
              </option>
              <option
                value="asia"
                onClick={() => {
                  handleContinentChange({ target: { value: "Asia" } });
                  closeSelect();
                }}
                style={{ padding: "1px 0px 4px 15px", cursor: "pointer" }}
              >
                Asia
              </option>
              <option
                value="europe"
                onClick={() => {
                  handleContinentChange({ target: { value: "Europe" } });
                  closeSelect();
                }}
                style={{ padding: "1px 0px 4px 15px", cursor: "pointer" }}
              >
                Europe
              </option>
              <option
                value="oceania"
                onClick={() => {
                  handleContinentChange({ target: { value: "Oceania" } });
                  closeSelect();
                }}
                style={{ padding: "1px 0px 12px 15px", cursor: "pointer" }}
              >
                Oceania
              </option>
            </div>
          )}
        </div>
      </div>
      {filteredResults.map((result) => (
        <CountryCard key={result.name} country={result} />
      ))}
    </div>
  );
};

export default Search;
