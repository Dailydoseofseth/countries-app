// CountryCard component
// Displays ONE CTRY INFO per INSTANCE

import { Link } from "react-router-dom";

function CountryCard({ country }) {
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
            <strong>Population:</strong> {population}
          </p>

          {/* Region (continent grouping) */}
          <p>
            <strong>Region:</strong> {region}
          </p>

          {/* Capital city WITH TERNARY JIC...(some countries may not have one?) */}
          <p>
            <strong>Capital:</strong> {capital ? capital[0] : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
