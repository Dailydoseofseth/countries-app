// "ACTION PAGE"

// ADD useEffect & useState HOOKS
import { useEffect, useState } from "react";

// React Router tools
import { Link, useParams } from "react-router-dom";

function CountryDetail({ countries, getSavedCountries }) {
  // get country name from API URL parameter
  const countryName = useParams().countryName;

  // STATE VAR to store COUNTRY VIEW COUNT from backend
  const [countryCount, setCountryCount] = useState(null);

  // find MATCHING CTRY OBJ from countries ARRAY
  const country = countries.find((country) => {
    return country.name.common === countryName;
  });

  // POST request:
  // increases COUNTRY VIEW COUNT by +1
  // backend RETURNS updated COUNT value
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

      // Convert API response into JavaScript DATA
      const data = await response.json();

      console.log("UPDATED COUNTRY COUNT:", data);

      // Save returned COUNT into STATE VAR
      setCountryCount(data.count);
    } catch (error) {
      console.log("ERROR updating country count:", error);
    }
  };

  // useEffect MUST stay ABOVE conditional returns
  // otherwise HOOK ORDER changes between renders
  useEffect(() => {
    // ONLY run IF country exists
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

          {/* COUNTRY VIEW COUNT from backend */}
          <p>
            <strong>Views:</strong> {countryCount}
          </p>

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

          {/* SAVE button triggers POST */}
          <button onClick={saveCountry}>Save Country</button>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
