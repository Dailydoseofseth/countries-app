import { useParams } from "react-router-dom";

function CountryDetail({ countries }) {
  // get country name from URL parameter
  const countryName = useParams().countryName;

  console.log("CountryDetail countryName:", countryName);

  // find MATCHING CTRY OBJ from countries ARRAY
  const selectedCountry = countries.find((country) => {
    return country.name.common === countryName;
  });

  return (
    <>
      <h2>
        {selectedCountry ? selectedCountry.name.common : "Loading Loading..."}
      </h2>
    </>
  );
}

export default CountryDetail;
