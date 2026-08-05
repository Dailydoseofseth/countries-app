import { useState } from "react";

import CountryCard from "../components/CountryCard";
import { useLanguage } from "../context/LanguageContext";

function Home({ countries }) {
  const { t } = useLanguage();


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


  // _____________________________________________________
  // 🔥 DEBUG: .map INSIDE cosnsole.log! (always logs visible countries + their CCA3 codes 🔥)
  console.log(
    regionFilteredCountries.map((country) => {
      return {
        name: country.name.common,
        cca3: country.cca3,
      };
    }),
  );

  return (
    <>
      {/* SEARCH + FILTER controls */}
      <div className="controls">
        {/* SEARCH BAR */}
        <div className="search-bar-container">
          <input
            className="search-input"
            type="text"
            placeholder={t("searchPlaceholder")}
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
            <option value="">{t("filterByRegion")}</option>
            <option value="Africa">{t("regionAfrica")}</option>
            <option value="Americas">{t("regionAmericas")}</option>
            <option value="Asia">{t("regionAsia")}</option>
            <option value="Europe">{t("regionEurope")}</option>
            <option value="Oceania">{t("regionOceania")}</option>
            <option value="Antarctica">{t("regionAntarctica")}</option>
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
