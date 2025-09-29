import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about">
      <div className="about__container">
        {/* Hero Section */}
        <section className="about__hero">
          <div className="about__hero-content">
            <h1 className="about__title">
              About Kyuna Jewelry - Best Jewellery Store in Godavarikhani &
              Hyderabad
            </h1>
            <p className="about__subtitle">
              Discover our story, craftsmanship, and commitment to quality that
              has made us the trusted choice for premium jewelry across
              Telangana.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="about__story">
          <div className="about__story-content">
            <div className="about__story-text">
              <h2 className="about__section-title">Our Story</h2>
              <p className="about__story-description">
                Founded with a passion for traditional craftsmanship and modern
                elegance, Kyuna Jewelry has been serving the communities of
                Godavarikhani and Hyderabad for over a decade. We started as a
                small family business with a simple mission: to provide
                authentic, high-quality jewelry that celebrates both tradition
                and contemporary style.
              </p>
              <p className="about__story-description">
                Today, we are proud to be recognized as the best jewellery store
                in Godavarikhani and Hyderabad, with thousands of satisfied
                customers who trust us for their most precious moments. Our
                commitment to 91.6 purity silver and certified gold jewelry has
                earned us a reputation for excellence across Telangana.
              </p>
            </div>
            <div className="about__story-image">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&q=80"
                alt="Traditional jewelry craftsmanship at Kyuna Jewelry"
                className="about__image"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="about__why-choose">
          <div className="about__why-choose-content">
            <h2 className="about__section-title">Why Choose Kyuna Jewelry?</h2>
            <div className="about__features-grid">
              <div className="about__feature">
                <div className="about__feature-icon">🏆</div>
                <h3 className="about__feature-title">#1 Rated Store</h3>
                <p className="about__feature-description">
                  Best jewellery store in Godavarikhani and Hyderabad with
                  5-star customer reviews and 1000+ satisfied customers.
                </p>
              </div>
              <div className="about__feature">
                <div className="about__feature-icon">✨</div>
                <h3 className="about__feature-title">Premium Quality</h3>
                <p className="about__feature-description">
                  Only 91.6 purity silver and certified gold jewellery with BIS
                  hallmark certification and authenticity guarantee.
                </p>
              </div>
              <div className="about__feature">
                <div className="about__feature-icon">👥</div>
                <h3 className="about__feature-title">Expert Staff</h3>
                <p className="about__feature-description">
                  Certified gemologists and knowledgeable team to help you
                  choose the perfect jewellery for any occasion.
                </p>
              </div>
              <div className="about__feature">
                <div className="about__feature-icon">💰</div>
                <h3 className="about__feature-title">Best Prices</h3>
                <p className="about__feature-description">
                  Competitive rates with best jewellery prices in Godavarikhani
                  and Hyderabad, guaranteed.
                </p>
              </div>
              <div className="about__feature">
                <div className="about__feature-icon">🛡️</div>
                <h3 className="about__feature-title">Quality Assurance</h3>
                <p className="about__feature-description">
                  Every piece comes with authenticity certificate and lifetime
                  warranty for your peace of mind.
                </p>
              </div>
              <div className="about__feature">
                <div className="about__feature-icon">🏪</div>
                <h3 className="about__feature-title">Local Trust</h3>
                <p className="about__feature-description">
                  Trusted by Godavarikhani and Hyderabad residents for over 10
                  years with authentic craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Collection Section */}
        <section className="about__collection">
          <div className="about__collection-content">
            <h2 className="about__section-title">Our Premium Collection</h2>
            <div className="about__collection-grid">
              <div className="about__collection-item">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop&q=80"
                  alt="Silver Anklets Collection"
                  className="about__collection-image"
                />
                <h3 className="about__collection-title">Silver Anklets</h3>
                <p className="about__collection-description">
                  Traditional and modern silver anklets crafted with 91.6 purity
                  silver, perfect for everyday wear and special occasions.
                </p>
              </div>
              <div className="about__collection-item">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&q=80"
                  alt="Silver Bangles Collection"
                  className="about__collection-image"
                />
                <h3 className="about__collection-title">Silver Bangles</h3>
                <p className="about__collection-description">
                  Elegant silver bangles and bracelets featuring intricate
                  traditional patterns and contemporary designs.
                </p>
              </div>
              <div className="about__collection-item">
                <img
                  src="https://images.unsplash.com/photo-1603561596112-db0b1b0b6b8b?w=400&h=300&fit=crop&q=80"
                  alt="Silver Necklaces Collection"
                  className="about__collection-image"
                />
                <h3 className="about__collection-title">Silver Necklaces</h3>
                <p className="about__collection-description">
                  Stunning silver necklaces and chains ranging from simple
                  designs to elaborate statement pieces.
                </p>
              </div>
              <div className="about__collection-item">
                <img
                  src="https://images.unsplash.com/photo-1603561596112-db0b1b0b6b8b?w=400&h=300&fit=crop&q=80"
                  alt="Bridal Jewellery Collection"
                  className="about__collection-image"
                />
                <h3 className="about__collection-title">Bridal Jewellery</h3>
                <p className="about__collection-description">
                  Complete bridal silver jewellery sets perfect for Telugu
                  weddings and cultural celebrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="about__values">
          <div className="about__values-content">
            <h2 className="about__section-title">Our Values</h2>
            <div className="about__values-grid">
              <div className="about__value">
                <h3 className="about__value-title">Authenticity</h3>
                <p className="about__value-description">
                  We guarantee 91.6 purity in all our silver jewelry with proper
                  certification and hallmarking.
                </p>
              </div>
              <div className="about__value">
                <h3 className="about__value-title">Craftsmanship</h3>
                <p className="about__value-description">
                  Each piece is crafted by skilled artisans using traditional
                  techniques passed down through generations.
                </p>
              </div>
              <div className="about__value">
                <h3 className="about__value-title">Customer Service</h3>
                <p className="about__value-description">
                  We provide personalized service and expert guidance to help
                  you find the perfect jewelry piece.
                </p>
              </div>
              <div className="about__value">
                <h3 className="about__value-title">Community</h3>
                <p className="about__value-description">
                  We are proud to serve the communities of Godavarikhani and
                  Hyderabad with dedication and care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Our Store Section */}
        <section className="about__visit">
          <div className="about__visit-content">
            <div className="about__visit-text">
              <h2 className="about__section-title">Visit Our Store</h2>
              <p className="about__visit-description">
                Experience the beauty of our jewelry collection in person at our
                Godavarikhani store. Our knowledgeable staff will help you find
                the perfect piece for any occasion. We also serve customers from
                Hyderabad and surrounding areas with the same dedication to
                quality and service.
              </p>
              <div className="about__visit-info">
                <div className="about__visit-item">
                  <strong>Location:</strong> Godavarikhani, Telangana
                </div>
                <div className="about__visit-item">
                  <strong>Service Area:</strong> Hyderabad & Surrounding Areas
                </div>
                <div className="about__visit-item">
                  <strong>Online Shopping:</strong> Free Delivery Across India
                </div>
                <div className="about__visit-item">
                  <strong>Customer Support:</strong> +91 9704634670
                </div>
              </div>
            </div>
            <div className="about__visit-image">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&q=80"
                alt="Kyuna Jewelry Store Interior"
                className="about__image"
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="about__cta">
          <div className="about__cta-content">
            <h2 className="about__cta-title">
              Ready to Find Your Perfect Jewelry?
            </h2>
            <p className="about__cta-description">
              Explore our collection of premium 91.6 silver jewelry and discover
              why we're the best jewelry store in Godavarikhani and Hyderabad.
            </p>
            <div className="about__cta-buttons">
              <a
                href="/"
                className="about__cta-button about__cta-button--primary"
              >
                Shop Now
              </a>
              <a
                href="/contact"
                className="about__cta-button about__cta-button--secondary"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
