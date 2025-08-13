import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "./Button";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to checkout
    console.log("Proceeding to checkout...");
  };

  if (items.length === 0) {
    return (
      <div className="cart">
        <div className="cart__container">
          <div className="cart__empty">
            <h2>Your cart is empty</h2>
            <p>Add some beautiful jewelry to get started!</p>
            <Button onClick={() => navigate("/")} variant="primary">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__container">
        {/* Breadcrumb */}
        <div className="cart__breadcrumb">
          <span>Home</span>
          <span className="cart__separator">/</span>
          <span className="cart__current">Shopping Cart</span>
        </div>

        {/* Cart Title */}
        <div className="cart__header">
          <h1>Shopping Cart ({items.length})</h1>
        </div>

        <div className="cart__main">
          {/* Cart Items */}
          <div className="cart__items">
            {items.map((item) => (
              <div key={item.id} className="cart__item">
                <div className="cart__item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart__item-details">
                  <h3 className="cart__item-name">{item.name}</h3>
                  <p className="cart__item-size">Size 7</p>
                </div>

                <div className="cart__item-price">
                  <span className="cart__item-currency">₹</span>
                  <span className="cart__item-amount">
                    {item.discountPrice || item.price}
                  </span>
                </div>

                <div className="cart__item-quantity">
                  <button
                    className="cart__quantity-btn"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="cart__quantity-number">{item.quantity}</span>
                  <button
                    className="cart__quantity-btn"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="cart__item-total">
                  <span className="cart__item-currency">₹</span>
                  <span className="cart__item-amount">
                    {(item.discountPrice || item.price) * item.quantity}
                  </span>
                </div>

                <button
                  className="cart__remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart__summary">
            <h2 className="cart__summary-title">Order Summary</h2>

            <div className="cart__summary-row">
              <span>Subtotal</span>
              <span>₹{getCartTotal()}</span>
            </div>

            <div className="cart__summary-row">
              <span>Shipping</span>
              <span className="cart__summary-free">Free</span>
            </div>

            <div className="cart__summary-row">
              <span>Taxes</span>
              <span className="cart__summary-calculated">
                Calculated at checkout
              </span>
            </div>

            <div className="cart__summary-row cart__summary-row--total">
              <span>Total</span>
              <span>₹{getCartTotal()}</span>
            </div>

            <p className="cart__summary-note">
              Shipping costs will be calculated during checkout.
            </p>

            <Button
              onClick={handleCheckout}
              variant="primary"
              size="large"
              fullWidth
              className="cart__checkout-btn"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
