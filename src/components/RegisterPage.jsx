import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./RegisterPage.scss";

const RegisterPage = () => {
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      clearError();
      const result = await register(
        formData.name,
        formData.email,
        formData.phoneNumber,
        formData.password
      );

      if (result.success) {
        navigate("/"); // Redirect to home page after successful registration
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__container">
        <div className="register-page__content">
          <div className="register-page__header">
            <h1 className="register-page__title">Create Account</h1>
            <p className="register-page__subtitle">
              Join Kyuna and start shopping
            </p>
          </div>

          {error && <div className="register-page__error-message">{error}</div>}

          <form className="register-page__form" onSubmit={handleSubmit}>
            <div className="register-page__form-group">
              <label htmlFor="name" className="register-page__label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`register-page__input ${
                  errors.name ? "register-page__input--error" : ""
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <span className="register-page__error">{errors.name}</span>
              )}
            </div>

            <div className="register-page__form-group">
              <label htmlFor="email" className="register-page__label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`register-page__input ${
                  errors.email ? "register-page__input--error" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="register-page__error">{errors.email}</span>
              )}
            </div>

            <div className="register-page__form-group">
              <label htmlFor="phoneNumber" className="register-page__label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`register-page__input ${
                  errors.phoneNumber ? "register-page__input--error" : ""
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <span className="register-page__error">
                  {errors.phoneNumber}
                </span>
              )}
            </div>

            <div className="register-page__form-group">
              <label htmlFor="password" className="register-page__label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`register-page__input ${
                  errors.password ? "register-page__input--error" : ""
                }`}
                placeholder="Create a password"
              />
              {errors.password && (
                <span className="register-page__error">{errors.password}</span>
              )}
            </div>

            <div className="register-page__form-group">
              <label htmlFor="confirmPassword" className="register-page__label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`register-page__input ${
                  errors.confirmPassword ? "register-page__input--error" : ""
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <span className="register-page__error">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div className="register-page__form-group">
              <label className="register-page__checkbox-label">
                <input
                  type="checkbox"
                  className="register-page__checkbox"
                  required
                />
                <span className="register-page__checkmark"></span>I agree to the{" "}
                <a href="#" className="register-page__link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="register-page__link">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="register-page__submit-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="register-page__footer">
            <p className="register-page__text">
              Already have an account?{" "}
              <Link to="/login" className="register-page__link">
                Sign in
              </Link>
            </p>
            <p className="register-page__text">
              <Link to="/" className="register-page__back-link">
                ← Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
