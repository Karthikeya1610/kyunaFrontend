import React from "react";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const { name, price, discountPrice, rating, image, imageAlt } = product;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="product-card__star product-card__star--full">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span
          key="half"
          className="product-card__star product-card__star--half"
        >
          ☆
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span
          key={`empty-${i}`}
          className="product-card__star product-card__star--empty"
        >
          ☆
        </span>
      );
    }

    return stars;
  };

  const hasDiscount = discountPrice && discountPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img
          src={image}
          alt={imageAlt}
          className="product-card__image"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          className="product-card__image-placeholder"
          style={{ display: "none" }}
        >
          <span className="product-card__placeholder-icon">💎</span>
        </div>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__name">{name}</h3>

        <div className="product-card__rating">
          <div className="product-card__stars">{renderStars(rating)}</div>
          <span className="product-card__rating-text">{rating}/5</span>
        </div>

        <div className="product-card__price">
          {hasDiscount ? (
            <>
              <div className="product-card__price-row">
                <span className="product-card__currency">₹</span>
                <span className="product-card__amount product-card__amount--discount">
                  {discountPrice}
                </span>
                <span className="product-card__original-price">₹{price}</span>
              </div>
            </>
          ) : (
            <>
              <span className="product-card__currency">₹</span>
              <span className="product-card__amount">{price}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
