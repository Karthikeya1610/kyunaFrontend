import React from "react";
import { useOrder } from "../context/OrderContext";
import Button from "./Button";

const CheckoutConfirmation = ({
  onPlaceOrder,
  onPrev,
  orderSummary,
  items,
}) => {
  const { shippingAddress, paymentMethod, notes, loading } = useOrder();

  const handlePlaceOrder = () => {
    onPlaceOrder();
  };

  const handlePrev = () => {
    onPrev();
  };

  const handleImageError = (e) => {
    // Prevent infinite loop by checking if we're already showing a placeholder
    if (
      !e.target.src.includes("data:image") &&
      !e.target.src.includes("placeholder")
    ) {
      e.target.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTI1IDI1SDM1VjM1SDI1VjI1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K";
    }
  };

  return (
    <div className="checkout-confirmation">
      <h2>Order Confirmation</h2>

      <div className="confirmation-content">
        <div className="order-items">
          <h3>Order Items</h3>
          <div className="items-list">
            {items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-image">
                  <img
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0].url
                        : item.image ||
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTI1IDI1SDM1VjM1SDI1VjI1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K"
                    }
                    alt={item.name}
                    onError={handleImageError}
                  />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">
                    ₹{(item.discountPrice || item.price).toFixed(2)} ×{" "}
                    {item.quantity}
                  </p>
                </div>
                <div className="item-total">
                  ₹
                  {((item.discountPrice || item.price) * item.quantity).toFixed(
                    2
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shipping-info">
          <h3>Shipping Address</h3>
          <div className="address-details">
            <p>{shippingAddress.address}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.postalCode}
            </p>
            <p>{shippingAddress.country}</p>
            <p>Phone: {shippingAddress.phone}</p>
          </div>
        </div>

        <div className="payment-info">
          <h3>Payment Method</h3>
          <p>{paymentMethod}</p>
        </div>

        {notes && (
          <div className="delivery-notes">
            <h3>Delivery Notes</h3>
            <p>{notes}</p>
          </div>
        )}

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items Price:</span>
            <span>₹{orderSummary.itemsPrice.toFixed(2)}</span>
          </div>
          {/* <div className="summary-row">
            <span>Tax:</span>
            <span>Free</span>
          </div> */}
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{orderSummary.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <Button type="button" onClick={handlePrev} className="btn-secondary">
          Back to Payment
        </Button>
        <Button
          type="button"
          onClick={handlePlaceOrder}
          className="btn-primary"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
