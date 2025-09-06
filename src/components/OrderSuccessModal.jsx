import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./OrderSuccessModal.scss";

const OrderSuccessModal = ({ isOpen, onClose, orderData }) => {
  const navigate = useNavigate();

  if (!isOpen || !orderData) return null;

  const handleViewOrders = () => {
    onClose();
    navigate("/orders");
  };

  const handleContinueShopping = () => {
    onClose();
    navigate("/");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="order-success-modal-overlay" onClick={onClose}>
      <div className="order-success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="success-icon">✅</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        <div className="modal-content">
          <div className="order-details">
            <div className="detail-row">
              <span>Order ID:</span>
              <span>#{orderData._id.slice(-8)}</span>
            </div>
            <div className="detail-row">
              <span>Order Date:</span>
              <span>{formatDate(orderData.createdAt)}</span>
            </div>
            <div className="detail-row">
              <span>Total Amount:</span>
              <span>₹{orderData.totalPrice.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <span className="status-pending">{orderData.status}</span>
            </div>
          </div>

          <div className="order-items-summary">
            <h3>Order Items ({orderData.orderItems.length})</h3>
            {orderData.orderItems.map((item, index) => (
              <div key={index} className="summary-item">
                <img
                  src={
                    item.image ||
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTI1IDI1SDM1VjM1SDI1VjI1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K"
                  }
                  alt={item.name}
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTI1IDI1SDM1VjM1SDI1VjI1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K";
                  }}
                />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="shipping-info">
            <h3>Shipping Address</h3>
            <div className="address-details">
              <p>{orderData.shippingAddress.address}</p>
              <p>
                {orderData.shippingAddress.city},{" "}
                {orderData.shippingAddress.postalCode}
              </p>
              <p>{orderData.shippingAddress.country}</p>
              <p>Phone: {orderData.shippingAddress.phone}</p>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <Button onClick={handleViewOrders} className="btn-primary">
            View My Orders
          </Button>
          <Button onClick={handleContinueShopping} className="btn-secondary">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
