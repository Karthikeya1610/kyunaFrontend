import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  // Function to get user initials
  const getUserInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

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

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        // Here you would typically make an API call to update the user profile
        // For now, we'll just simulate the update
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Update successful
        setIsEditing(false);
        // You might want to update the user context here
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    // Reset form data to original user data
    setFormData({
      name: user.name || "",
      phoneNumber: user.phoneNumber || "",
    });
    setErrors({});
    setIsEditing(false);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="profile-settings">
      <div className="profile-settings__container">
        <button
          className="profile-settings__back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <div className="profile-settings__header">
          <p className="profile-settings__subtitle">
            Manage your account information
          </p>
        </div>

        <div className="profile-settings__avatar-section">
          <div className="profile-settings__avatar">
            {getUserInitials(user.name)}
          </div>
          <div className="profile-settings__user-info">
            <h2 className="profile-settings__user-name">{user.name}</h2>
            <p className="profile-settings__user-email">{user.email}</p>
            <span className="profile-settings__user-role">{user.role}</span>
          </div>
        </div>

        <form className="profile-settings__form" onSubmit={handleSubmit}>
          <div className="profile-settings__form-group">
            <label htmlFor="name" className="profile-settings__label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`profile-settings__input ${
                errors.name ? "profile-settings__input--error" : ""
              } ${!isEditing ? "profile-settings__input--disabled" : ""}`}
            />
            {errors.name && (
              <span className="profile-settings__error">{errors.name}</span>
            )}
          </div>

          <div className="profile-settings__form-group">
            <label htmlFor="email" className="profile-settings__label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              disabled
              className="profile-settings__input profile-settings__input--disabled"
            />
            <p className="profile-settings__help-text">
              Email cannot be changed
            </p>
          </div>

          <div className="profile-settings__form-group">
            <label htmlFor="phoneNumber" className="profile-settings__label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className={`profile-settings__input ${
                errors.phoneNumber ? "profile-settings__input--error" : ""
              } ${!isEditing ? "profile-settings__input--disabled" : ""}`}
            />
            {errors.phoneNumber && (
              <span className="profile-settings__error">
                {errors.phoneNumber}
              </span>
            )}
          </div>

          {/* <div className="profile-settings__form-actions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="profile-settings__cancel-btn"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="profile-settings__save-btn"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="profile-settings__edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
