import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
  // Receive full countries dataset as prop from App.jsx
  // Store dataset in LOCAL VAR for easier READING countriesData>COUNTRIES>COUNTRY (per card)
  const countries = countriesData;

  return (
    <div className="grid">
      {/* map through entire dataset ARRAY & render ONE CARD instance PER CTRY */}
      {/* uses INDEX as KEY VALUE, so that it renders ONE instance of EVERY CTRY with an index number in the array*/}
      {countries.map((country, index) => {
        return <CountryCard key={index} country={country} />;
      })}
    </div>
  );
}

export default Home;
