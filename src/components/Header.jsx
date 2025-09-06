import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBox,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Function to get user initials
  const getUserInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfileSettings = () => {
    navigate("/profile");
    setShowDropdown(false);
  };

  const handleOrders = () => {
    navigate("/orders");
    setShowDropdown(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowDropdown(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <div className="header__logo-section">
            <div
              className="header__logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <div className="header__logo-icon">💎</div>
              <span className="header__logo-text">Kyuna</span>
            </div>
          </div>
        </div>

        <div className="header__center">
          <div className="header__search">
            <input
              type="text"
              placeholder="Search for jewelry, gemstones, and more..."
              className="header__search-input"
            />
            <button className="header__search-btn">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="header__right">
          <button className="header__cart-btn" onClick={handleCartClick}>
            <FaShoppingCart />
            <span className="header__cart-count">{getCartCount()}</span>
          </button>

          {isAuthenticated ? (
            <div className="header__user-section" ref={dropdownRef}>
              <div className="header__profile" onClick={handleProfileClick}>
                <div className="header__profile-avatar">
                  {getUserInitials(user?.name)}
                </div>
                <span className="header__profile-name">{user?.name}</span>
              </div>

              {showDropdown && (
                <div className="header__dropdown">
                  <div
                    className="header__dropdown-item"
                    onClick={handleProfileSettings}
                  >
                    <FaUser />
                    <span>Profile Settings</span>
                  </div>
                  <div className="header__dropdown-item" onClick={handleOrders}>
                    <FaBox />
                    <span>My Orders</span>
                  </div>
                  <div className="header__dropdown-divider"></div>
                  <div className="header__dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="header__signin-btn"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
