// CountryCard component
// Displays ONE CTRY INFO per INSTANCE

function CountryCard({ country }) {
  // Destructure country object for cleaner access
  const { name, population, region, capital, flags } = country;

  return (
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
        {/* Capital city (some countries may not have one?) */}
        <p>
          <strong>Capital:</strong> {capital ? capital[0] : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;
