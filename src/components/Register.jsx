import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically make an API call to register
      console.log("Register attempt:", formData);
      // For now, just navigate to login page
      navigate("/login");
    }
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__header">
          <h1 className="register__title">Create Account</h1>
          <p className="register__subtitle">Join Kyuna and start shopping</p>
        </div>

        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__form-row">
            <div className="register__form-group">
              <label htmlFor="firstName" className="register__label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`register__input ${
                  errors.firstName ? "register__input--error" : ""
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <span className="register__error">{errors.firstName}</span>
              )}
            </div>

            <div className="register__form-group">
              <label htmlFor="lastName" className="register__label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`register__input ${
                  errors.lastName ? "register__input--error" : ""
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <span className="register__error">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="register__form-group">
            <label htmlFor="email" className="register__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`register__input ${
                errors.email ? "register__input--error" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="register__error">{errors.email}</span>
            )}
          </div>

          <div className="register__form-group">
            <label htmlFor="password" className="register__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`register__input ${
                errors.password ? "register__input--error" : ""
              }`}
              placeholder="Create a password"
            />
            {errors.password && (
              <span className="register__error">{errors.password}</span>
            )}
          </div>

          <div className="register__form-group">
            <label htmlFor="confirmPassword" className="register__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`register__input ${
                errors.confirmPassword ? "register__input--error" : ""
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span className="register__error">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="register__form-group">
            <label className="register__checkbox-label">
              <input type="checkbox" className="register__checkbox" required />
              <span className="register__checkmark"></span>I agree to the{" "}
              <Link to="/terms" className="register__link">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="register__link">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button type="submit" className="register__submit-btn">
            Create Account
          </button>
        </form>

        <div className="register__footer">
          <p className="register__text">
            Already have an account?{" "}
            <Link to="/login" className="register__link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
