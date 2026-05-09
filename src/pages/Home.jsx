import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
  const countries = countriesData;

  return (
    <div className="grid">
      {countries.map((country, index) => {
        return <CountryCard key={index} country={country} />;
      })}
    </div>
  );
}

export default Home;
