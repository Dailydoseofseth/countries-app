import { useState } from "react";

import CountryCard from "../components/CountryCard";

function Home({ countries }) {
  // STATE VAR for SEARCH input text
  const [search, setSearch] = useState("");

  // STATE VAR for REGION dropdown selection
  const [region, setRegion] = useState("");

  // Receive full countries dataset as prop PASSED DOWN from App.jsx for easier READING COUNTRIES>COUNTRY (per card)

  // Create COPY of countries ARRAY before sorting
  // real-world DEV NOTE:
  // .sort() MUTATES original ARRAY, so we copy first using spread operator
  const sortedCountries = [...countries].sort((a, b) => {
    return a.name.common.localeCompare(b.name.common);
  });

  // FILTER countries ARRAY based on SEARCH input
  const searchFilteredCountries = sortedCountries.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });

  // FILTER countries ARRAY based on REGION dropdown
  const regionFilteredCountries = searchFilteredCountries.filter((country) => {
    // IF no region selected, SHOW ALL countries
    if (region === "") {
      return true;
    }

    // otherwise ONLY show MATCHING region
    return country.region === region;
  });

  // updates STATE VAR while user types into SEARCH input
  function handleSearch(event) {
    setSearch(event.target.value);
  }

  // updates STATE VAR when user selects REGION
  function handleRegion(event) {
    setRegion(event.target.value);
  }

  return (
    <>
      {/* SEARCH + FILTER controls */}
      <div className="controls">
        {/* SEARCH BAR */}
        <div className="search-bar-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search for a country..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* REGION FILTER dropdown */}
        <div className="filter-container">
          <select
            className="region-select"
            value={region}
            onChange={handleRegion}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </div>
      </div>
      <div className="grid">
        {/* map through ARRAY & render ONE CARD instance PER CTRY */}
        {/* uses cca3 as KEY VALUE (BEST PRACTICE) */}
        {/* LEFT side = prop name | RIGHT side = actual object */}
        {/*  */}
        {regionFilteredCountries.map((country) => {
          return <CountryCard key={country.cca3} country={country} />;
        })}
      </div>
    </>
  );
}

export default Home;
