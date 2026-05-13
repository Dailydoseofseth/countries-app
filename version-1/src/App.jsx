import "./App.css";

//ADD useState & useEffect FETCHing API DATA
import { useEffect, useState } from "react";

// BACKUP local data IF API FAILS (Kept on purppose)
import localData from "../localData";

import CountryDetail from "./pages/CountryDetail";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";

import { Routes, Route, Link } from "react-router-dom";

function App() {
  // STATE VAR to store all countries data
  // Starts as an EMPTY ARRAY, but will be FILLED with API DATA
  const [countries, setCountries] = useState([]);

  // FETCH countries data from RESTCountries API using ASYNC/AWAIT
  const getCountries = async () => {
    try {
      // API request
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders",
      );

      // Convert API response into JSON object
      const data = await response.json();

      console.log(data);

      // Save API countries into state-VAR via SETTER FUNC
      setCountries(data);
    } catch (error) {
      console.log("ERROR:", error.message);

      // the ('else') FALLBACK TO localData.js >>>IF<<< API fails
      setCountries(localData);
    }
  };

  // useEffect runs ONCE when page first loads
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      {/* NAV LINKS for page routing */}
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            Where in the world?
          </Link>

          <Link to="/SavedCountries" className="saved-link">
            Saved Countries
          </Link>
        </nav>
      </header>

      <Routes>
        {/* Home page NOW receives API countries data */}
        <Route path="/" element={<Home countries={countries} />} />

        {/* Future pages NOW also receive countries data */}
        <Route
          path="/SavedCountries"
          element={<SavedCountries countries={countries} />}
        />

        {/* Country Detail page uses COUNTRY NAME from URL (dynamic routing) */}
        <Route
          path="/CountryDetail/:countryName"
          element={<CountryDetail countries={countries} />}
        />
      </Routes>
    </div>
  );
}

export default App;
