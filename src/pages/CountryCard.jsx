import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country, isDarkMode }) => {
  return (
    <div
      className="cards"
      style={{
        display: "inline-block",
        margin: "50px",
        width: "220px",
        paddingBottom: "8px",
        borderRadius: "5px",
      }}
    >
      <Link
        to={`/country/${country.alpha3Code}`}
        style={{
          textDecoration: "none",
          lineHeight: "11px",
          color: isDarkMode ? "#fff" : "black",
        }}
      >
        <img 
          src={country.flag}
          alt={`Flag of ${country.name}`}
          style={{
            width: "220px",
            height: "130px",
            objectFit: "cover",
            borderTopRightRadius: "5px",
            borderTopLeftRadius: "5px",
          }}
        />
        <p
          style={{
            width: "220px",
            fontWeight: "400",
            fontSize: "14px",
            paddingLeft: "15px",
          }}
        >
          {country.name}
        </p>
        <p style={{ fontSize: "14px", paddingLeft: "15px", fontWeight: "300" }}>
          Population: {country.population}
        </p>
        <p style={{ fontSize: "14px", paddingLeft: "15px", fontWeight: "300" }}>
          Region: {country.region}
        </p>
        <p style={{ fontSize: "14px", paddingLeft: "15px", fontWeight: "300" }}>
          Capital: {country.capital}
        </p>
      </Link>
    </div>
  );
};

export default CountryCard;
