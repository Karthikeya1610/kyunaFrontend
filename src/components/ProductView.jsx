import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "./Button";
import Rating from "./Rating";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import "./ProductView.scss";

const ProductView = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const product = getProductById(productId);

  // If product not found, show error or redirect
  if (!product) {
    return (
      <div className="product-view">
        <div className="product-view__container">
          <div className="product-view__error">
            <h2>Product not found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/")} variant="primary">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product);
    // You could add a toast notification here
    console.log(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
    { id: "qa", label: "Q&A" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="product-view__tab-content">
            <p>{product.description}</p>
          </div>
        );
      case "specifications":
        return (
          <div className="product-view__tab-content">
            <div className="product-view__specs">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="product-view__spec-row">
                  <span className="product-view__spec-label">{key}:</span>
                  <span className="product-view__spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="product-view__tab-content">
            <Rating
              rating={product.rating}
              totalReviews={product.totalReviews}
              showBreakdown={true}
              breakdown={product.ratingBreakdown}
            />
          </div>
        );
      case "qa":
        return (
          <div className="product-view__tab-content">
            <p>No questions yet. Be the first to ask!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="product-view">
      <div className="product-view__container">
        {/* Back Button */}
        <div className="product-view__back">
          <Button
            variant="text"
            onClick={() => navigate("/")}
            className="product-view__back-btn"
          >
            ← Back to Products
          </Button>
        </div>

        {/* Breadcrumb */}
        <div className="product-view__breadcrumb">
          <span>Jewelry</span>
          <span className="product-view__separator">/</span>
          <span>Products</span>
          <span className="product-view__separator">/</span>
          <span className="product-view__current">{product.name}</span>
        </div>

        <div className="product-view__main">
          {/* Left Side - Image Gallery */}
          <div className="product-view__gallery">
            <div className="product-view__main-image">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="product-view__image"
              />
            </div>
            <div className="product-view__thumbnails">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`product-view__thumbnail ${
                    selectedImage === index
                      ? "product-view__thumbnail--active"
                      : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="product-view__thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="product-view__details">
            <h1 className="product-view__title">{product.name}</h1>

            {/* Price Section */}
            <div className="product-view__price">
              {hasDiscount ? (
                <>
                  <div className="product-view__price-row">
                    <span className="product-view__currency">₹</span>
                    <span className="product-view__amount product-view__amount--discount">
                      {product.discountPrice}
                    </span>
                    <span className="product-view__original-price">
                      ₹{product.price}
                    </span>
                    <span className="product-view__discount-badge">
                      -{discountPercentage}% off
                    </span>
                  </div>
                </>
              ) : (
                <div className="product-view__price-row">
                  <span className="product-view__currency">₹</span>
                  <span className="product-view__amount">{product.price}</span>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="product-view__availability">
              <span className="product-view__availability-text">
                {product.availability}
              </span>
            </div>

            {/* Rating */}
            <div className="product-view__rating">
              <Rating
                rating={product.rating}
                totalReviews={product.totalReviews}
              />
            </div>

            {/* Action Buttons */}
            <div className="product-view__actions">
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                size="large"
                fullWidth
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                variant="text"
                onClick={() => console.log("Add to Wishlist")}
              >
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="product-view__tabs">
          <div className="product-view__tab-headers">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`product-view__tab-header ${
                  activeTab === tab.id ? "product-view__tab-header--active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
