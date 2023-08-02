import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CountryDetails = ({ toggleMode }) => {
  const navigate = useNavigate();
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v2/alpha/${countryCode}` 
        );
        setCountry(response.data);
        setError(null);
      } catch (error) {
        console.log("Error fetching country details:", error);
        setError("Error fetching country details. Please try again later.");
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  useEffect(() => {
    const fetchBorderCountryNames = async () => {
      try {
        if (
          !country ||
          !Array.isArray(country.borders) ||
          country.borders.length === 0
        ) {
          return;
        }

        const borderCodes = country.borders;
        const requests = borderCodes.map((code) =>
          axios.get(`https://restcountries.com/v2/alpha/${code}`)
        );
        const responses = await Promise.all(requests);
        const borderCountriesData = responses.map(
          (response) => response.data.name
        );
        setBorderCountries(borderCountriesData);
        setError(null);
      } catch (error) {
        console.log("Error fetching border country names:", error);
        setError(
          "Error fetching border country names. Please try again later."
        );
      }
    };

    fetchBorderCountryNames();
  }, [country]);

  const handleGoBack = () => {
    navigate("/");
  };

  const imageWidth = windowWidth < 375 ? "200px" : "340px";
  const imageHeight = windowWidth < 375 ? "150px" : "250px";

  if (!country) {
    return <div>Loading country details...</div>;
  }

  return (
    <div className="details">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "140px",
          marginLeft: "50px",
        }}
        className="country-details"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            position: "absolute",
            top: "120px",
            left: "88px",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          onClick={handleGoBack}
          toggleMode={toggleMode}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32.242"
            height="18.693"
            viewBox="0 0 32.242 18.693"
          >
            <g id="arrow-left" transform="translate(-202.723 -137.717)">
              <path
                id="Path_278"
                data-name="Path 278"
                d="M16475.775,1222.011l-8.639,8.639,8.639,8.639"
                transform="translate(-16263 -1083.587)"
                fill="none"
                stroke="var(--arrow-stroke-color)"
                strokeWidth="2"
              />
              <line
                id="Line_68"
                data-name="Line 68"
                x1="30.57"
                transform="translate(204.395 147.155)"
                fill="none"
                stroke="var(--arrow-stroke-color)"
                strokeWidth="2"
              />
            </g>
          </svg>
          Back
        </div>

        <img
          className="img"
          src={country.flag}
          alt={`Flag of ${country.name}`}
          style={{
            width: imageWidth,
            height: imageHeight,
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />

        <div
          style={{
            paddingLeft: "50px",
            lineHeight: "12px",
            marginBottom: "50px",
            fontWeight: "300",
          }}
          className="paragarth"
        >
          <p
            style={{
              marginBottom: "40px",
              fontWeight: "600",
              fontSize: "22px",
            }}
          >
            {country.name}
          </p>
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital}</p>
          <p>Native name: {country.name}</p>
        </div>

        <div
          style={{
            marginBottom: "20px",
            fontWeight: "300",
            lineHeight: "12px",
            paddingLeft: "50px",
          }}
          className="paragraph"
        >
          <p>Top Level Domain: {country.topLevelDomain.join(",")}</p>
          <p>
            Currencies:{" "}
            {country.currencies.map((currency) => currency.code).join(", ")}
          </p>
          <p>
            Language:{" "}
            {country.languages.map((language) => language.name).join(", ")}
          </p>
        </div>

        <div
          className="borders"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: "440px",
            bottom: "160px",
          }}
        >
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              fontWeight: "300",
            }}
          >
            Border Countries:
            <div
              className="bordercountry"
              style={{ display: "flex", gap: "8px", overflowX: "auto" }}
            >
              {borderCountries.map((borderCountry) => (
                <p
                  className="border"
                  key={borderCountry}
                  style={{
                    display: "flex",
                    position: "relative",
                    padding: "5px 20px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    margin: "0",
                  }}
                >
                  {borderCountry}
                </p>
              ))}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
