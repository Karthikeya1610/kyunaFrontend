import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "./Button";
import Rating from "./Rating";
import ImageModal from "./ImageModal";
import Context from "../context/context";
import { useCart } from "../context/CartContext";
import "./ProductView.scss";

const ProductView = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, items, updateQuantity } = useCart();
  const { itemsId, loading, getItemsId } = useContext(Context);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (productId) {
      getItemsId(productId);
    }
  }, [productId]);

  const product = itemsId?.item || itemsId;

  // Check if product is in cart and get its quantity
  const cartItem = items.find(
    (item) => (item._id || item.id) === (product?._id || product?.id)
  );
  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.quantity || 0;

  // Show loading state
  if (loading) {
    return (
      <div className="product-view">
        <div className="product-view__container">
          <div className="product-view__loading">
            <h2>Loading product...</h2>
          </div>
        </div>
      </div>
    );
  }

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

  // Set default values for missing data
  const productWithDefaults = {
    ...product,
    rating: product.rating || 5,
    totalReviews: product.totalReviews || 0,
    description: product.description || "No description available",
    availability: product.availability || "In Stock",
    ratingBreakdown: product.ratingBreakdown || {},
    specifications: product.specifications || {},
  };

  const hasDiscount =
    productWithDefaults.discountPrice &&
    productWithDefaults.discountPrice < productWithDefaults.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((productWithDefaults.price - productWithDefaults.discountPrice) /
          productWithDefaults.price) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(productWithDefaults);
    // You could add a toast notification here
    console.log(`${productWithDefaults.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(productWithDefaults);
    navigate("/cart");
  };

  const handleIncreaseQuantity = () => {
    const productId = productWithDefaults._id || productWithDefaults.id;
    updateQuantity(productId, cartQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    const productId = productWithDefaults._id || productWithDefaults.id;
    updateQuantity(productId, cartQuantity - 1);
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
            <p>{productWithDefaults.description}</p>
          </div>
        );
      case "specifications":
        return (
          <div className="product-view__tab-content">
            <div className="product-view__specs">
              {Object.entries(productWithDefaults.specifications).map(
                ([key, value]) => (
                  <div key={key} className="product-view__spec-row">
                    <span className="product-view__spec-label">{key}:</span>
                    <span className="product-view__spec-value">{value}</span>
                  </div>
                )
              )}
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="product-view__tab-content">
            <Rating
              rating={productWithDefaults.rating}
              totalReviews={productWithDefaults.totalReviews}
              showBreakdown={true}
              breakdown={productWithDefaults.ratingBreakdown}
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
          <span className="product-view__current">
            {productWithDefaults.name}
          </span>
        </div>

        <div className="product-view__main">
          {/* Left Side - Image Gallery */}
          <div className="product-view__gallery">
            <div
              className="product-view__main-image"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={
                  productWithDefaults.images &&
                  productWithDefaults.images[selectedImage]
                    ? productWithDefaults.images[selectedImage].url
                    : ""
                }
                alt={productWithDefaults.name}
                className="product-view__image"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="product-view__thumbnails">
              {productWithDefaults.images &&
                productWithDefaults.images.map((image, index) => (
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
                      src={image.url}
                      alt={`${productWithDefaults.name} view ${index + 1}`}
                      className="product-view__thumbnail-image"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="product-view__details">
            <h1 className="product-view__title">{productWithDefaults.name}</h1>

            {/* Price Section */}
            <div className="product-view__price">
              {hasDiscount ? (
                <>
                  <div className="product-view__price-row">
                    <span className="product-view__currency">₹</span>
                    <span className="product-view__amount product-view__amount--discount">
                      {productWithDefaults.discountPrice?.toLocaleString()}
                    </span>
                    <span className="product-view__original-price">
                      ₹{productWithDefaults.price?.toLocaleString()}
                    </span>
                    <span className="product-view__discount-badge">
                      -{discountPercentage}% off
                    </span>
                  </div>
                </>
              ) : (
                <div className="product-view__price-row">
                  <span className="product-view__currency">₹</span>
                  <span className="product-view__amount">
                    {productWithDefaults.price?.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="product-view__availability">
              <span className="product-view__availability-text">
                {productWithDefaults.availability}
              </span>
            </div>

            {/* Rating */}
            <div className="product-view__rating">
              <Rating
                rating={productWithDefaults.rating}
                totalReviews={productWithDefaults.totalReviews}
              />
            </div>

            {/* Action Buttons */}
            <div className="product-view__actions">
              {!isInCart ? (
                <Button
                  variant="primary"
                  size="large"
                  fullWidth
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              ) : (
                <div className="product-view__quantity-controls">
                  <button
                    className="product-view__quantity-btn product-view__quantity-btn--decrease"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </button>
                  <span className="product-view__quantity-display">
                    {cartQuantity}
                  </span>
                  <button
                    className="product-view__quantity-btn product-view__quantity-btn--increase"
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </button>
                </div>
              )}
              <Button
                variant="secondary"
                size="large"
                fullWidth
                onClick={handleBuyNow}
              >
                Buy Now
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

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={productWithDefaults.images || []}
        currentImageIndex={selectedImage}
        onImageChange={setSelectedImage}
      />
    </div>
  );
};

export default ProductView;
