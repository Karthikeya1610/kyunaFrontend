import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically make an API call to authenticate
      console.log("Login attempt:", formData);
      // For now, just navigate to home page
      navigate("/");
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h1 className="login__title">Welcome Back</h1>
          <p className="login__subtitle">Sign in to your Kyuna account</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-group">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`login__input ${
                errors.email ? "login__input--error" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="login__error">{errors.email}</span>
            )}
          </div>

          <div className="login__form-group">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`login__input ${
                errors.password ? "login__input--error" : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="login__error">{errors.password}</span>
            )}
          </div>

          <div className="login__form-group">
            <label className="login__checkbox-label">
              <input type="checkbox" className="login__checkbox" />
              <span className="login__checkmark"></span>
              Remember me
            </label>
          </div>

          <button type="submit" className="login__submit-btn">
            Sign In
          </button>
        </form>

        <div className="login__footer">
          <p className="login__text">
            Don't have an account?{" "}
            <Link to="/register" className="login__link">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
