import CountryCard from "../components/CountryCard";

function Home({ countries }) {
  // Receive full countries dataset as prop PASSED DOWN from App.jsx for easier READING COUNTRIES>COUNTRY (per card)

  return (
    <div className="grid">
      {/* map through ARRAY & render ONE CARD instance PER CTRY */}
      {/* uses cca3 as KEY VALUE (BEST PRACTICE) */}

      {countries.map((country) => {
        return <CountryCard key={country.cca3} country={country} />;
      })}
    </div>
  );
}

export default Home;
