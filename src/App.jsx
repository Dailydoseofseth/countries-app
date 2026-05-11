import "./App.css";
import data from "../localData";

import CountryDetail from "./pages/CountryDetail";
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";

import { Routes, Route, Link } from "react-router-dom";
// import { useState } from "react";

function App() {
  // const [savedCountries, setSavedCountries] = useState([]);

  return (
    <div>
      {/* <h1>Countries App</h1> */}
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
        {/* Home page receives full countries dataset */}
        {/* URL PATH & what element to render */}
        <Route path="/" element={<Home countriesData={data} />} />

        {/* Placeholder PAGES for future features */}
        <Route path="/SavedCountries" element={<SavedCountries />} />
        <Route path="/CountryDetail" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;
