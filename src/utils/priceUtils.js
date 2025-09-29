/**
 * Utility functions for price calculations
 */

/**
 * Get display prices for a product based on price category
 * @param {Object} product - The product object
 * @param {Array} prices - Array of price objects from context
 * @returns {Object|false} - Object with discountedPrice and originalPrice, or false if no match
 */
export const getDisplayPrices = (product, prices) => {
  if (!product || !prices || !Array.isArray(prices)) {
    return false;
  }

  const pricesFilter = prices.find(
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

/**
 * Calculate the final price for a product (with weight multiplication)
 * @param {Object} product - The product object
 * @param {Array} prices - Array of price objects from context
 * @returns {Object} - Object with final prices and display information
 */
export const calculateProductPrice = (product, prices) => {
  const displayPrices = getDisplayPrices(product, prices);

  if (!displayPrices) {
    // Fallback to product's own price
    return {
      finalPrice: product.price || 0,
      originalPrice: product.price || 0,
      hasDiscount: false,
      discountPercentage: 0,
      source: "product",
    };
  }

  // Calculate prices with weight multiplication
  const weight = product.weight || 1;
  const discountedPrice = displayPrices.discountedPrice * weight;
  const originalPrice = displayPrices.originalPrice * weight;

  const hasDiscount = discountedPrice < originalPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  return {
    finalPrice: hasDiscount ? discountedPrice : originalPrice,
    originalPrice: originalPrice,
    hasDiscount: hasDiscount,
    discountPercentage: discountPercentage,
    source: "prices",
  };
};
