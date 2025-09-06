import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import API_URLS from "../config/api";
import Button from "./Button";
import "./Orders.scss";

const Orders = () => {
  const navigate = useNavigate();
  const { cancelOrder } = useOrder();
  const { isAuthenticated, token } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    // Direct API call to fetch orders
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URLS.MY_ORDERS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Extract orders from response
        const ordersData = response.data.orders || [];
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate, token]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#ffc107";
      case "processing":
        return "#17a2b8";
      case "shipped":
        return "#007bff";
      case "delivered":
        return "#28a745";
      case "cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleCancelOrder = async (orderId, cancellationReason) => {
    try {
      setLoading(true);

      const response = await axios.put(
        API_URLS.CANCEL_ORDER(orderId),
        {
          cancellationReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the order in local state
      setOrders(
        orders.map((order) => (order._id === orderId ? response.data : order))
      );

      // Close modal if it's the cancelled order
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(null);
      }

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error cancelling order:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to cancel order",
      };
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="orders">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track and manage your orders</p>
        </div>

        {loading && (
          <div className="loading">
            <p>Loading orders...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="no-orders">
            <div className="no-orders-content">
              <h3>No orders yet</h3>
              <p>
                You haven't placed any orders yet. Start shopping to see your
                orders here.
              </p>
              <Button onClick={() => navigate("/")} className="btn-primary">
                Start Shopping
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div key={order._id || `order-${index}`} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order._id ? order._id.slice(-8) : "N/A"}</h3>
                    <p className="order-date">
                      Placed on{" "}
                      {order.createdAt
                        ? formatDate(order.createdAt)
                        : "Unknown date"}
                    </p>
                  </div>
                  <div className="order-status">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="order-items-preview">
                  {order.orderItems.slice(0, 3).map((item, index) => (
                    <div key={index} className="preview-item">
                      <img
                        src={
                          item.image ||
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTI1IDI1SDM1VjM1SDI1VjI1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K"
                        }
                        alt={item.name}
                        onError={handleImageError}
                      />
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                  {order.orderItems.length > 3 && (
                    <div className="more-items">
                      +{order.orderItems.length - 3} more items
                    </div>
                  )}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total: ₹{order.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="order-actions">
                    <Button
                      onClick={() => handleViewOrder(order)}
                      className="btn-outline"
                    >
                      View Details
                    </Button>
                    {order.status === "pending" && (
                      <Button
                        onClick={() => navigate(`/orders/${order._id}/cancel`)}
                        className="btn-danger"
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onCancelOrder={handleCancelOrder}
          loading={loading}
        />
      )}
    </div>
  );
};

const OrderModal = ({ order, onClose, onCancelOrder, loading }) => {
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#ffc107";
      case "processing":
        return "#17a2b8";
      case "shipped":
        return "#007bff";
      case "delivered":
        return "#28a745";
      case "cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const handleCancelOrderClick = async () => {
    if (!cancellationReason.trim()) {
      alert("Please provide a reason for cancellation");
      return;
    }

    const result = await onCancelOrder(order._id, cancellationReason);
    if (result.success) {
      setShowCancelForm(false);
      setCancellationReason("");
      onClose();
    }
  };

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Details</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="order-summary">
            <div className="summary-row">
              <span>Order ID:</span>
              <span>#{order._id ? order._id.slice(-8) : "N/A"}</span>
            </div>
            <div className="summary-row">
              <span>Order Date:</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="summary-row">
              <span>Status:</span>
              <span
                className="status-badge"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status}
              </span>
            </div>
            <div className="summary-row">
              <span>Total:</span>
              <span>₹{order.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="order-items">
            <h3>Order Items</h3>
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
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="shipping-info">
            <h3>Shipping Address</h3>
            <div className="address-details">
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p>Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="payment-info">
            <h3>Payment Information</h3>
            <p>Method: {order.paymentMethod}</p>
            {order.notes && (
              <div className="delivery-notes">
                <h4>Delivery Notes:</h4>
                <p>{order.notes}</p>
              </div>
            )}
          </div>

          {order.status === "pending" && !showCancelForm && (
            <div className="modal-actions">
              <Button
                onClick={() => setShowCancelForm(true)}
                className="btn-danger"
              >
                Cancel Order
              </Button>
            </div>
          )}

          {showCancelForm && (
            <div className="cancel-form">
              <h3>Cancel Order</h3>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Please provide a reason for cancellation..."
                rows={4}
              />
              <div className="cancel-actions">
                <Button
                  onClick={() => {
                    setShowCancelForm(false);
                    setCancellationReason("");
                  }}
                  className="btn-secondary"
                >
                  Back
                </Button>
                <Button
                  onClick={handleCancelOrderClick}
                  className="btn-danger"
                  disabled={loading}
                >
                  {loading ? "Cancelling..." : "Confirm Cancellation"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
