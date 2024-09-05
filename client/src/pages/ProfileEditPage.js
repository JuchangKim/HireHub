import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileEditPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user data on component mount
    axios
      .get("/api/user/profile")
      .then((response) => setUser(response.data))
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        // Optionally set default values or handle error state
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("/api/user/profile", user)
      .then((response) => {
        // Handle success (e.g., redirect or show a success message)
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        // Set error messages if needed
        setErrors(error.response?.data?.errors || {});
      });
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name || ""} // Default to empty string if user.name is undefined
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email || ""} // Default to empty string if user.email is undefined
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber || ""} // Default to empty string if user.phoneNumber is undefined
            onChange={handleChange}
          />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
