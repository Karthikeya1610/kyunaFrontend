import React, { useState, useContext } from "react";
import ImageModal from "./ImageModal";
import Context from "../context/context";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const { name, images, price, discountPrice, specifications, weight } =
    product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { prices } = useContext(Context);

  const getDisplayPrices = (product) => {
    let pricesFilter = prices?.find(
      (p) => p._id === product?.specifications?.priceCategory
    );
    if (pricesFilter) {
      return {
        discountedPrice: pricesFilter.discountedPrice,
        originalPrice: pricesFilter.originalPrice,
      };
    }

    return false;
  };

  // Get the first image from the images array
  const image = images && images.length > 0 ? images[0].url : null;
  const imageAlt = name || "Product Image";

  // Additional debugging for price display

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
          {(() => {
            const displayPrices = getDisplayPrices(product);
            if (!displayPrices) {
              return (
                <div className="product-card__price-row">
                  <span className="product-card__currency">₹</span>
                  <span className="product-card__amount">
                    {product.price?.toLocaleString() || "0"}
                  </span>
                </div>
              );
            }
            const hasDiscount =
              displayPrices.discountedPrice < displayPrices.originalPrice;

            return hasDiscount ? (
              <>
                <div className="product-card__price-row">
                  <span className="product-card__currency">₹</span>
                  <span className="product-card__amount product-card__amount--discount">
                    {displayPrices.discountedPrice?.toLocaleString() *
                      product.weight || "0"}
                  </span>
                  <span className="product-card__original-price">
                    ₹
                    {displayPrices.originalPrice?.toLocaleString() *
                      product.weight || "0"}
                  </span>
                </div>
                {/* Debug info - remove in production */}
              </>
            ) : (
              <>
                <span className="product-card__currency">₹</span>
                <span className="product-card__amount">
                  {displayPrices.originalPrice?.toLocaleString() || "0"}
                </span>
                {/* Debug info - remove in production */}
              </>
            );
          })()}
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
