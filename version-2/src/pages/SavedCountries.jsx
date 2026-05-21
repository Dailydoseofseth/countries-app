import { useState, useEffect } from "react";

function SavedCountries() {
  // Create the FORM via Form state.
  // Starts as an OBJECT with EMPTY STRINGS for each form field, but will be FILLED with USER INPUT
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    bio: "",
  });

  // Stores newest USER NAME from backend
  const [newUserName, setNewUserName] = useState(null);

  // Stores all USER INFO from form submit
  // const [userInfo, setUserInfo] = useState(null);

  // GET newest USER data from backend API using ASYNC/AWAIT & a Try/Catch ERROR HANDLER
  const getNewestUser = async () => {
    try {
      // FETCH request to backend API using the PROXY endpoint
      const response = await fetch("/api/get-newest-user");

      // Convert JSON response into JavaScript data
      const data = await response.json();

      console.log("NEWEST user:", data);

      // Save newest USER NAME into state using Dot/Bracket Notation
      setNewUserName(data[0].name);
      //runs IF FETCH FAILS
    } catch (error) {
      console.log("ERROR loading user:", error);
    }
  };

  // Runs ONLY ONCE (bc dependency array) when component first loads
  // Used here to automatically send GET REQ newest user immediately
  // React THNE updates state & automatically re-renders UI with that user info
  useEffect(() => {
    getNewestUser();
  }, []);

  // Updates state when user types
  function handleChange(event) {
    setFormData({
      // Spread operator to keep existing form data. UPDATES specific field that changes each time FROM USER INPUT (using event.target.name (key) & event.target.value (new value))
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // ("/api/add-one-user") is the endpoint for POST request to store USER data from form submit
  // ("https://backend-answer-keys.onrender.com/api/add-one-user")
  //   // Async function to SEND form data to backend/database

  const storeUserData = async (data) => {
    await fetch("/api/add-one-user", {
      //SENDS new data TO backend
      method: "POST",
      // Tells backend the incoming data is JSON
      headers: {
        "Content-Type": "application/json",
      },
      // Converts JS OBJ into JSON STRING before sending to backend
      body: JSON.stringify({
        // LEFT side = backend/database field names (KEY)
        // RIGHT side = React form data values (VALUE)
        name: data.fullName,
        country_name: data.country,
        email: data.email,
        bio: data.bio,
      }),
    });
  };

  // Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitted", formData);

    // WAIT for POST request to finish storing data in backend
    await storeUserData(formData);

    // instantly update UI (no waiting for GET)
    setNewUserName(formData.fullName);
  };

  return (
    <div className="form-page">
      <h2>Saved Countries</h2>

      {/* ONLY renders welcome message IF newest USER exists */}
      {newUserName && <h3>Welcome, {newUserName}!</h3>}

      {/* CALLS handleSubmit when form is submitted */}
      <form className="my-profile-form" onSubmit={handleSubmit}>
        <h2>My Profile</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Name"
          value={formData.fullName}
          onChange={handleChange} //UPDATES formData STATE with USER INPUT as THEY TYPE
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default SavedCountries;
