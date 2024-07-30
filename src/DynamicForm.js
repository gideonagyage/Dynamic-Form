import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function DynamicForm() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Validate form fields
  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
      case "name":
        // Name must be at least 3 characters long
        if (value.length < 3) {
          error = "Name must be at least 3 characters long.";
        }
        break;
      case "email":
        // Email must be a valid email address
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "password":
        // Password must contain at least 8 characters and a number
        if (!/^(?=.*\d).{8,}$/.test(value)) {
          error = "Password must contain at least 8 characters and a number.";
        }
        break;
      case "confirmPassword":
        // Confirm password must match the password
        if (value !== formData.password) {
          error = "Passwords do not match.";
        }
        break;
      default:
        break;
    }
    // Set error state
    setErrors({ ...errors, [fieldName]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    // Alert to display form details after submission
    alert(
      `Form submitted successfully!\n
      Name: ${formData.name}
      Email: ${formData.email}
      Password: ${formData.password}`
    );

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {/* Form */}
      <div className="card col-12 col-md-6 col-lg-4 border-2 border-primary shadow rounded-3">
        <div className="card-header bg-primary py-4">
          <h2 className="card-title text-center text-white font-bold">
            Create an Account
          </h2>
          <p className="card-subtitle text-center text-white text-sm">
            Kindly fill the form below
          </p>
        </div>
        <form onSubmit={handleSubmit} className="card-body p-4">
          <div className="mb-3 text-start">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              minLength={3}
              required
            />
            <div className="invalid-feedback">{errors.name}</div>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter a password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              pattern="^(?=.*\d).{8,}$"
              required
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary w-50 my-1"
              disabled={Object.values(errors).some((error) => error !== "")}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* End of Form */}
    </div>
  );
}

export default DynamicForm;
