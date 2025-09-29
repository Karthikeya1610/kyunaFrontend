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
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Function to get user initials
  const getUserInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
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

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleMobileMenuClose = () => {
    setShowMobileMenu(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Mobile Menu Button */}
        <button
          className="header__mobile-menu-btn"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle mobile menu"
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>

        <div className="header__left">
          <div className="header__logo-section">
            <div
              className="header__logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={logo}
                alt="Kyuna Jewelry Logo"
                className="header__logo-image"
              />
              <span className="header__logo-text">Kyuna</span>
            </div>
          </div>
        </div>

        <div className="header__center">
          <div className="header__search">
            <input
              type="text"
              placeholder="Search jewelry..."
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

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="header__mobile-menu" ref={mobileMenuRef}>
          <div className="header__mobile-menu-content">
            {/* Mobile Menu Header with Close Button */}
            <div className="header__mobile-menu-header">
              <h3 className="header__mobile-menu-title">Menu</h3>
              <button
                className="header__mobile-close-btn"
                onClick={handleMobileMenuClose}
                aria-label="Close mobile menu"
              >
                <FaTimes />
              </button>
            </div>

            <div className="header__mobile-search">
              <input
                type="text"
                placeholder="Search jewelry..."
                className="header__mobile-search-input"
              />
              <button className="header__mobile-search-btn">
                <FaSearch />
              </button>
            </div>

            <nav className="header__mobile-nav">
              <a
                href="/"
                className="header__mobile-nav-link"
                onClick={handleMobileMenuClose}
              >
                Home
              </a>
              <a
                href="/silver-anklets"
                className="header__mobile-nav-link"
                onClick={handleMobileMenuClose}
              >
                Silver Anklets
              </a>
              <a
                href="/silver-bangles"
                className="header__mobile-nav-link"
                onClick={handleMobileMenuClose}
              >
                Silver Bangles
              </a>
              <a
                href="/silver-necklaces"
                className="header__mobile-nav-link"
                onClick={handleMobileMenuClose}
              >
                Silver Necklaces
              </a>
              <a
                href="/bridal-silver-jewellery"
                className="header__mobile-nav-link"
                onClick={handleMobileMenuClose}
              >
                Bridal Jewellery
              </a>
              <a
                href="/about-kyuna-jewelry"
                className="header__mobile-nav-link"
                onClick={handleMobileMenuClose}
              >
                About Us
              </a>
            </nav>

            <div className="header__mobile-user-section">
              {isAuthenticated ? (
                <div className="header__mobile-user-info">
                  <div className="header__mobile-profile">
                    <div className="header__mobile-profile-avatar">
                      {getUserInitials(user?.name)}
                    </div>
                    <span className="header__mobile-profile-name">
                      {user?.name}
                    </span>
                  </div>
                  <div className="header__mobile-user-actions">
                    <button
                      className="header__mobile-action-btn"
                      onClick={() => {
                        handleProfileSettings();
                        handleMobileMenuClose();
                      }}
                    >
                      <FaUser />
                      Profile Settings
                    </button>
                    <button
                      className="header__mobile-action-btn"
                      onClick={() => {
                        handleOrders();
                        handleMobileMenuClose();
                      }}
                    >
                      <FaBox />
                      My Orders
                    </button>
                    <button
                      className="header__mobile-action-btn"
                      onClick={() => {
                        handleLogout();
                        handleMobileMenuClose();
                      }}
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="header__mobile-auth">
                  <button
                    className="header__mobile-signin-btn"
                    onClick={() => {
                      navigate("/login");
                      handleMobileMenuClose();
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="header__mobile-register-btn"
                    onClick={() => {
                      navigate("/register");
                      handleMobileMenuClose();
                    }}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
