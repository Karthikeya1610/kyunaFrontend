import React, { useState } from "react";
import ImageModal from "./ImageModal";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const { name, images, price, discountPrice } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the first image from the images array
  const image = images && images.length > 0 ? images[0].url : null;
  const imageAlt = name || "Product Image";

  const hasDiscount = discountPrice && discountPrice < price;

  return (
    <div className="product-card">
      <div
        className="product-card__image-container"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={image}
          alt={imageAlt}
          className="product-card__image"
          style={{ cursor: "pointer" }}
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

        <div className="product-card__price">
          {hasDiscount ? (
            <>
              <div className="product-card__price-row">
                <span className="product-card__currency">₹</span>
                <span className="product-card__amount product-card__amount--discount">
                  {discountPrice?.toLocaleString()}
                </span>
                <span className="product-card__original-price">
                  ₹{price?.toLocaleString()}
                </span>
              </div>
            </>
          ) : (
            <>
              <span className="product-card__currency">₹</span>
              <span className="product-card__amount">
                {price?.toLocaleString()}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images || []}
        currentImageIndex={0}
        onImageChange={() => {}}
      />
    </div>
  );
};

export default ProductCard;
