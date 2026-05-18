import { Link, useParams } from "react-router-dom";

function CountryDetail({ countries }) {
  // get country name from API URL parameter
  const countryName = useParams().countryName;

  // find MATCHING CTRY OBJ from countries ARRAY
  const country = countries.find((country) => {
    return country.name.common === countryName;
  });

  // Prevents crash while API data is still loading
  if (!country) {
    return <h2>Loading...</h2>;
  }

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
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
