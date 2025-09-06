import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutConfirmation from "./CheckoutConfirmation";
import OrderSuccessModal from "./OrderSuccessModal";
import "./Checkout.scss";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const {
    createOrder,
    setCheckoutStep,
    checkoutStep,
    shippingAddress,
    paymentMethod,
    notes,
    loading,
    error,
    clearError,
  } = useOrder();
  const { isAuthenticated } = useAuth();
  const [orderSummary, setOrderSummary] = useState({
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 50,
    totalPrice: 0,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Don't redirect if we're showing the success modal
    if (items.length === 0 && !showSuccessModal) {
      navigate("/cart");
      return;
    }

    // Only calculate order summary if we have items
    if (items.length > 0) {
      const itemsPrice = getCartTotal();
      // const taxPrice = itemsPrice * 0.1; // 10% tax - commented out
      const taxPrice = 0; // Tax is free
      const shippingPrice = 0; // Shipping is free
      const totalPrice = itemsPrice + taxPrice + shippingPrice;

      setOrderSummary({
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
    }
  }, [items, getCartTotal, isAuthenticated, navigate, showSuccessModal]);

  const handleNextStep = () => {
    if (checkoutStep < 3) {
      setCheckoutStep(checkoutStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (checkoutStep > 1) {
      setCheckoutStep(checkoutStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        orderItems: items.map((item) => ({
          item: item._id || item.id,
          name: item.name,
          price: item.discountPrice || item.price,
          quantity: item.quantity,
          image:
            item.images && item.images.length > 0
              ? item.images[0].url
              : item.image || "",
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: orderSummary.itemsPrice,
        taxPrice: orderSummary.taxPrice,
        shippingPrice: orderSummary.shippingPrice,
        totalPrice: orderSummary.totalPrice,
        notes,
      };

      const result = await createOrder(orderData);

      if (result.success) {
        clearCart();
        setOrderData(result.data.order);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutAddress onNext={handleNextStep} />;
      case 2:
        return (
          <CheckoutPayment onNext={handleNextStep} onPrev={handlePrevStep} />
        );
      case 3:
        return (
          <CheckoutConfirmation
            onPlaceOrder={handlePlaceOrder}
            onPrev={handlePrevStep}
            orderSummary={orderSummary}
            items={items}
          />
        );
      default:
        return <CheckoutAddress onNext={handleNextStep} />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  // If cart is empty but we have order data, show the success modal
  if (items.length === 0 && orderData) {
    return (
      <div className="checkout">
        <OrderSuccessModal
          isOpen={true}
          onClose={() => setShowSuccessModal(false)}
          orderData={orderData}
        />
      </div>
    );
  }

  // If cart is empty and no order data, don't render anything (will redirect)
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <div className={`step ${checkoutStep >= 1 ? "active" : ""}`}>
              <span className="step-number">1</span>
              <span className="step-title">Address</span>
            </div>
            <div className={`step ${checkoutStep >= 2 ? "active" : ""}`}>
              <span className="step-number">2</span>
              <span className="step-title">Payment</span>
            </div>
            <div className={`step ${checkoutStep >= 3 ? "active" : ""}`}>
              <span className="step-number">3</span>
              <span className="step-title">Confirmation</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={clearError} className="close-error">
              ×
            </button>
          </div>
        )}

        <div className="checkout-content">{renderStep()}</div>
      </div>

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        orderData={orderData}
      />
    </div>
  );
};

export default Checkout;
