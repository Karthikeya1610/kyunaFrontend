import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Register.scss";

const Register = ({ onSuccess, onClose, onSwitchToLogin }) => {
  const { register, loading, error, clearError } = useAuth();
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
        onSuccess();
      }
    }
  };

  return (
    <div className="register-modal" onClick={onClose}>
      <div
        className="register-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="register-modal__close" onClick={onClose}>
          ×
        </button>

        <div className="register__header">
          <h1 className="register__title">Create Account</h1>
          <p className="register__subtitle">Join Kyuna and start shopping</p>
        </div>

        {error && <div className="register__error-message">{error}</div>}

        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__form-group">
            <label htmlFor="name" className="register__label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`register__input ${
                errors.name ? "register__input--error" : ""
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span className="register__error">{errors.name}</span>
            )}
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
            <label htmlFor="phoneNumber" className="register__label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`register__input ${
                errors.phoneNumber ? "register__input--error" : ""
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <span className="register__error">{errors.phoneNumber}</span>
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
              <a href="#" className="register__link">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="register__link">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="register__submit-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="register__footer">
          <p className="register__text">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="register__link"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
