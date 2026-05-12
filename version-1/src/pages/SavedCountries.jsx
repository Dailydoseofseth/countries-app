import { useState } from "react";

function SavedCountries() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  // Updates state when user types
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // Handles form submit
  function handleSubmit(event) {
    event.preventDefault();

    console.log(formData);
  }

  return (
    <div className="form-page">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Save Your Profile</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
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
