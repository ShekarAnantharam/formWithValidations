import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import './UserForm.css'; // Import UserForm styles


const UserForm = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    age: "",
    dob: "",
    phone: "",
    addresses: [""],
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;

    if (name === "addresses") {
      const addresses = [...user.addresses];
      addresses[index] = value;
      setUser({ ...user, addresses });
    } else {
      setUser({ ...user, [name]: value });
    }
  };
  const isNameValid = (name) => {
    // Check for minimum length of 10 characters
    if (name.length < 0 && name.length > 20) {
      return false;
    }

    // Check for at least one special character and one uppercase letter
    const pattern = /^[A-Za-z\s]+$/;

    return pattern.test(name);
  };
  const isPasswordValid = (password) => {
    // Check for minimum length of 10 characters
    if (password.length < 10) {
      return false;
    }

    // Check for at least one special character and one uppercase letter
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const uppercaseLetterRegex = /[A-Z]+/;

    return (
      specialCharRegex.test(password) && uppercaseLetterRegex.test(password)
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = Date.now();
    const newUser = {
      id,
      ...user,
    };
    dispatch(addUser(newUser));

    setUser({
      name: "",
      age: "",
      dob: "",
      phone: "",
      addresses: [""],
      password: "",
      confirmPassword: "",
    });
  };

  const handleAddAddress = () => {
    setUser({ ...user, addresses: [...user.addresses, ""] });
  };
  const handleRemoveAddress = () => {};
  console.log("user", user);
  // Implement the form layout
  return (
    <div className="section">
 <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* Name */}
          <label className="form-label">Name*</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => handleInputChange(e)}
            pattern="^[A-Za-z\s]+$"
            maxLength="20"
            required
            className="form-input"
          />
          {!isNameValid(user.name) && (
            <p className="error-message">
              Name cannot contain numbers or special characters{" "}
            </p>
          )}
          {/* Age */}
        </div>
        <label className="form-label">Age*</label>
        <input
          className="form-input"
          type="number"
          name="age"
          value={user.age}
          onChange={(e) => handleInputChange(e)}
        />
        {/* Date of Birth */}
        <label 
          className="form-label"
          >Date of Birth*</label>
        <input
          className="form-input"

          type="date"
          name="dob"
          value={user.dob}
          onChange={(e) => handleInputChange(e)}
          max={new Date().toISOString().split("T")[0]} // Set maximum date to today
          required
        />
        {/* Phone Number */}
        <label className="form-label">Phone Number*</label>
        <input
          className="form-input"
          type="tel"
          name="phone"
          value={user.phone}
          onChange={(e) => handleInputChange(e)}
          pattern="[0-9]{8,10}"
          minLength="8"
          maxLength="10"
          required
        />
        {/* Address */}
        <div className="form-group">
          <label className="form-label">Address*</label>
          {user.addresses.map((address, index) => (
            <div key={index}>
              <input
                type="text"
                name="addresses"
                value={address}
                onChange={(e) => handleInputChange(e, index)}
                className="form-input"
                required
              />
              {index > 0 && (
                <button
                  className="remove-address-button"
                  onClick={() => handleRemoveAddress(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button className="add-address-button" onClick={handleAddAddress}>
            +
          </button>
        </div>
      
        {/* Password */}
        <label className="form-label">Password*</label>
        <input
          className="form-input"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleInputChange(e)}
          required
        />
        {!isPasswordValid(user.password) && (
          <p className="error-message">
            Password must have a minimum length of 10 characters and contain at
            least one special character and one uppercase letter.
          </p>
        )}
        {/* Confirm Password */}
        <label
          className="form-label"
          >Confirm Password*</label>
        <input
          className="form-input"

          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={(e) => handleInputChange(e)}
        />
        {/* Submit Button */}
        <button className="submit-button" type="submit">Register</button>
      </form>
    </div>
    </div>
   
  );
};

export default UserForm;
