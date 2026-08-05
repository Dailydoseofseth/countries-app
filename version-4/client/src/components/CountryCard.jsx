// CountryCard component
// Displays ONE CTRY INFO per INSTANCE

import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

function CountryCard({ country }) {
  const { t } = useLanguage();

  // Destructure country OBJECT for cleaner access
  const { name, population, region, capital, flags } = country;

  return (
    // Dynamic ROUTE using COMMON country name
    <Link
      to={`/CountryDetail/${name.common}`}
      className="card-link"
    >
      <div className="card">
        {/* Ctry FLAG IMG outside of CARD's inner DIV - CSS styling reasons */}
        <img src={flags.svg || flags.png} alt={name.common} />

        <div className="card-body">
          {/* COMMON Country name (per instructions) */}
          <h3>{name.common}</h3>

          {/* Pop. data */}
          <p>
            <strong>{t("population")}</strong> {population}
          </p>

          {/* Region (continent grouping) */}
          <p>
            <strong>{t("region")}</strong> {region}
          </p>

          {/* Capital city WITH TERNARY JIC...(some countries may not have one?) */}
          <p>
            <strong>{t("capital")}</strong> {capital ? capital[0] : t("na")}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
