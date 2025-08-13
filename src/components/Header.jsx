import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();

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

            <div className="header__address">
              <span className="header__address-text">
                📍 123 Jewelry Street, Diamond District, Mumbai 400001
              </span>
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
            <button className="header__search-btn">🔍</button>
          </div>
        </div>

        <div className="header__right">
          <button className="header__signin-btn">Sign in</button>

          <button className="header__cart-btn" onClick={handleCartClick}>
            🛒
            <span className="header__cart-count">{getCartCount()}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
