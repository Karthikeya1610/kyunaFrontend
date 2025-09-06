import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import "./OrderCancel.scss";

const OrderCancel = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { fetchOrderById, cancelOrder, loading, error } = useOrder();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, isAuthenticated, navigate]);

  const fetchOrderDetails = async () => {
    const result = await fetchOrderById(orderId);
    if (result.success) {
      setOrder(result.data);
    }
  };

  const handleCancelOrder = async () => {
    if (!cancellationReason.trim()) {
      alert("Please provide a reason for cancellation");
      return;
    }

    setIsSubmitting(true);
    const result = await cancelOrder(orderId, cancellationReason);
    setIsSubmitting(false);

    if (result.success) {
      navigate("/orders");
    }
  };

  const handleBack = () => {
    navigate("/orders");
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="order-cancel">
        <div className="order-cancel-container">
          <div className="loading">
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-cancel">
        <div className="order-cancel-container">
          <div className="error-message">
            <p>{error}</p>
            <Button onClick={handleBack} className="btn-primary">
              Back to Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-cancel">
        <div className="order-cancel-container">
          <div className="not-found">
            <h2>Order not found</h2>
            <p>
              The order you're looking for doesn't exist or you don't have
              permission to view it.
            </p>
            <Button onClick={handleBack} className="btn-primary">
              Back to Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (order.status !== "pending") {
    return (
      <div className="order-cancel">
        <div className="order-cancel-container">
          <div className="cannot-cancel">
            <h2>Cannot Cancel Order</h2>
            <p>
              This order cannot be cancelled because it's already {order.status}
              .
            </p>
            <Button onClick={handleBack} className="btn-primary">
              Back to Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="order-cancel">
      <div className="order-cancel-container">
        <div className="order-cancel-header">
          <h1>Cancel Order</h1>
          <p>Order #{order._id.slice(-8)}</p>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Order Date:</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="summary-row">
              <span>Status:</span>
              <span className="status-pending">Pending</span>
            </div>
            <div className="summary-row">
              <span>Total Amount:</span>
              <span>₹{order.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="order-items">
            <h3>Items in this order:</h3>
            {order.orderItems.map((item, index) => (
              <div key={index} className="order-item">
                <img
                  src={
                    item.image ||
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTI1IDI1SDM1VjM1SDI1VjI1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K"
                  }
                  alt={item.name}
                  onError={handleImageError}
                />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>
                    Price: ₹{item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <div className="item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cancellation-form">
          <h2>Reason for Cancellation</h2>
          <p>
            Please let us know why you're cancelling this order. This helps us
            improve our service.
          </p>

          <div className="form-group">
            <label htmlFor="cancellationReason">Cancellation Reason *</label>
            <textarea
              id="cancellationReason"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="Please provide a reason for cancelling this order..."
              rows={5}
              required
            />
          </div>

          <div className="form-actions">
            <Button
              onClick={handleBack}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Back to Orders
            </Button>
            <Button
              onClick={handleCancelOrder}
              className="btn-danger"
              disabled={isSubmitting || !cancellationReason.trim()}
            >
              {isSubmitting ? "Cancelling..." : "Cancel Order"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCancel;
