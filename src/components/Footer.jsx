import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "9704634670";
    const message =
      "Hello! I'm interested in your jewelry collection. Can you help me?";
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
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
                  <a href="/silver-anklets" className="footer__link">
                    Silver Anklets
                  </a>
                </li>
                <li>
                  <a href="/silver-necklaces" className="footer__link">
                    Silver Necklaces
                  </a>
                </li>
                <li>
                  <a href="/silver-bangles" className="footer__link">
                    Silver Bangles
                  </a>
                </li>
                <li>
                  <a href="/bridal-silver-jewellery" className="footer__link">
                    Bridal Jewellery
                  </a>
                </li>
                <li>
                  <a
                    href="/91-6-silver-jewellery-hyderabad"
                    className="footer__link"
                  >
                    Hyderabad Store
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Customer Service</h3>
              <ul className="footer__list">
                <li>
                  <a href="/contact" className="footer__link">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/shipping-info" className="footer__link">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="/returns" className="footer__link">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="/size-guide" className="footer__link">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="/jewellery-care-guide" className="footer__link">
                    Care Instructions
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleWhatsAppClick}
                    className="footer__whatsapp-button"
                    aria-label="Contact us on WhatsApp"
                  >
                    <FaWhatsapp className="footer__whatsapp-icon" />
                    WhatsApp Support
                  </button>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Company</h3>
              <ul className="footer__list">
                <li>
                  <a href="/about-kyuna-jewelry" className="footer__link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/our-story" className="footer__link">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="/careers" className="footer__link">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/press" className="footer__link">
                    Press
                  </a>
                </li>
                <li>
                  <a href="/sustainability" className="footer__link">
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

      {/* Floating WhatsApp Button */}
      <div className="footer__floating-whatsapp">
        <button
          onClick={handleWhatsAppClick}
          className="footer__floating-whatsapp-button"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
        >
          <FaWhatsapp className="footer__floating-whatsapp-icon" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
