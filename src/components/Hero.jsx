import React from "react";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__text-section">
            <div className="hero__main-text">
              <h1 className="hero__title">
                <span className="hero__brand">Kyuna</span>
                <span className="hero__subtitle">Jewellery</span>
              </h1>

              <blockquote className="hero__quote">
                "Where elegance meets craftsmanship, and every piece tells a
                story of timeless beauty."
              </blockquote>

              <button className="hero__cta">Explore Collection</button>
            </div>
          </div>
        </div>

        <div className="hero__image-section">
          <div className="hero__jewellery-image">
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=800&fit=crop&q=100"
              alt="Golden Sunrise Pendant Jewellery"
              className="hero__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
