import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Footer Top */}
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo" onClick={handleLogoClick}>
              <img
                src={logo}
                alt="Kyuna Jewelry Logo"
                className="footer__logo-image"
              />
              <span className="footer__logo-text">Kyuna</span>
            </div>
            <p className="footer__description">
              Discover the finest collection of premium jewelry and gemstones.
              Crafted with precision and designed for elegance.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a
                href="#"
                className="footer__social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h3 className="footer__column-title">Shop</h3>
              <ul className="footer__list">
                <li>
                  <a href="#" className="footer__link">
                    Rings
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Necklaces
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Earrings
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Bracelets
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Watches
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Customer Service</h3>
              <ul className="footer__list">
                <li>
                  <a href="#" className="footer__link">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Care Instructions
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Company</h3>
              <ul className="footer__list">
                <li>
                  <a href="#" className="footer__link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Legal</h3>
              <ul className="footer__list">
                <li>
                  <a href="#" className="footer__link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © 2024 Kyuna Jewelry. All rights reserved.
            </p>
            <div className="footer__payment">
              <span className="footer__payment-text">We Accept:</span>
              <div className="footer__payment-icons">
                <span className="footer__payment-icon">💳</span>
                <span className="footer__payment-icon">🏦</span>
                <span className="footer__payment-icon">📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
