import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.scss";

const LoginPage = () => {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      clearError();
      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate("/"); // Redirect to home page after successful login
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__content">
          <div className="login-page__header">
            <h1 className="login-page__title">Welcome Back</h1>
            <p className="login-page__subtitle">
              Sign in to your Kyuna account
            </p>
          </div>

          {error && <div className="login-page__error-message">{error}</div>}

          <form className="login-page__form" onSubmit={handleSubmit}>
            <div className="login-page__form-group">
              <label htmlFor="email" className="login-page__label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`login-page__input ${
                  errors.email ? "login-page__input--error" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="login-page__error">{errors.email}</span>
              )}
            </div>

            <div className="login-page__form-group">
              <label htmlFor="password" className="login-page__label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`login-page__input ${
                  errors.password ? "login-page__input--error" : ""
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="login-page__error">{errors.password}</span>
              )}
            </div>

            <div className="login-page__form-group">
              <label className="login-page__checkbox-label">
                <input type="checkbox" className="login-page__checkbox" />
                <span className="login-page__checkmark"></span>
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="login-page__submit-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="login-page__footer">
            <p className="login-page__text">
              Don't have an account?{" "}
              <Link to="/register" className="login-page__link">
                Create account
              </Link>
            </p>
            <p className="login-page__text">
              <Link to="/" className="login-page__back-link">
                ← Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
