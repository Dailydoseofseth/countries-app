// "ACTION PAGE"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CountryDetail({ countries, savedCountries, getSavedCountries }) {
  // get country name from API URL parameter
  const countryName = useParams().countryName;

  // STATE VAR for COUNTRY VIEW COUNT
  const [countryCount, setCountryCount] = useState(0);

  // find MATCHING CTRY OBJ from countries ARRAY
  const country = countries.find((country) => {
    return country.name.common === countryName;
  });

  // checks IF current country already exists in SAVED countries ARRAY 
  // which HEART shows
  const isSaved = savedCountries.some((savedCountry) => {
    return savedCountry.country_name === country?.name.common;
  });

  // Updates COUNTRY VIEW COUNT in backend database
  const updateCountryCount = async () => {
    try {
      const response = await fetch("/api/update-one-country-count", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Convert JS OBJECT into JSON STRING before sending to BE
        body: JSON.stringify({
          country_name: country.name.common,
        }),
      });

      const data = await response.json();

      console.log("UPDATED COUNTRY COUNT:", data);

      // Save returned COUNT into state
      setCountryCount(data.count);
    } catch (error) {
      console.log("ERROR updating country count:", error);
    }
  };

  // useEffect runs AFTER component renders
  // updates country count EACH TIME a country detail page loads
  useEffect(() => {
    // prevents crash while country data still loading
    if (country) {
      updateCountryCount();
    }
  }, [country]);

  // Prevents crash while API data is still loading
  if (!country) {
    return <h2>Loading...</h2>;
  }

  // SENDS selected country TO BE/database SAVED_COUNTRIES table
  const saveCountry = async () => {
    try {
      await fetch("/api/save-one-country", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Convert JS OBJECT into JSON STRING before sending to BE
        body: JSON.stringify({
          country_name: country.name.common,
        }),
      });

      console.log("COUNTRY SAVED:", country.name.common);

      // refresh SAVED countries after POST request finishes
      getSavedCountries();
    } catch (error) {
      console.log("ERROR saving country:", error);
    }
  };

  // REMOVES selected country FROM backend/database SAVED_COUNTRIES table
  const unsaveCountry = async () => {
    try {
      await fetch("/api/unsave-one-country", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Convert JS OBJECT into JSON STRING before sending to BE
        body: JSON.stringify({
          country_name: country.name.common,
        }),
      });

      console.log("COUNTRY UNSAVED:", country.name.common);

      // refresh SAVED countries after POST request finishes
      getSavedCountries();
    } catch (error) {
      console.log("ERROR unsaving country:", error);
    }
  };

  return (
    <div className="detail-page">
      {/* Back button */}
      <Link to="/" className="back-btn">
        ← Back
      </Link>

      <div className="detail-container">
        {/* LEFT SIDE: FLAG */}
        <img
          className="detail-flag"
          src={country.flags.svg || country.flags.png}
          alt={country.name.common}
        />

        {/* RIGHT SIDE: DETAIL */}
        <div className="detail-content">
          {/* COMMON Country name */}
          <h1>{country.name.common}</h1>

          {/* Population */}
          <p>
            <strong>Population:</strong> {country.population}
          </p>

          {/* Region */}
          <p>
            <strong>Region:</strong> {country.region}
          </p>

          {/* Capital */}
          <p>
            <strong>Capital:</strong>{" "}
            {country.capital ? country.capital[0] : "N/A"}
          </p>

          {/* COUNTRY VIEW COUNT */}
          <p>
            <strong>Views:</strong> {countryCount}
          </p>

          {/* CONDITIONAL heart button */}
          {isSaved ? (
            <button onClick={unsaveCountry}>❤️ Unsave</button>
          ) : (
            <button onClick={saveCountry}>🩶 Save</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
