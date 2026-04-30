import "./App.css";
import CountryDetail from "./pages/CountryDetail";
import Home from "./pages/Home";
import SavedCoutnries from "./pages/SavedCountries";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";

function App() {
  // const [savedCountries, setSavedCountries] = useState([]);

  return (
    <>
      <h1>Countries App</h1>
      <SavedCoutnries />
      <CountryDetail />
      <Home />
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/CountryDetail">Country Detail</Link>
            </li>
            <li>
              <Link to="/SavedCountries">Saved Coutnries</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SavedCoutnires" element={<SavedCoutnries />} />
          <Route path="/CountryDetail" element={<CountryDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
