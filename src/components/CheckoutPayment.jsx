import React, { useState, useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import Button from "./Button";

const CheckoutPayment = ({ onNext, onPrev }) => {
  const { paymentMethod, setPaymentMethod, setNotes } = useOrder();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethod);
  const [notes, setNotesValue] = useState("");

  useEffect(() => {
    setSelectedMethod(paymentMethod);
  }, [paymentMethod]);

  const paymentMethods = [
    { id: "Credit Card", name: "Credit Card", icon: "💳" },
    { id: "Debit Card", name: "Debit Card", icon: "💳" },
    { id: "Mobile Money", name: "Mobile Money", icon: "📱" },
    { id: "Bank Transfer", name: "Bank Transfer", icon: "🏦" },
    { id: "Cash on Delivery", name: "Cash on Delivery", icon: "💰" },
  ];

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setPaymentMethod(method);
  };

  const handleNotesChange = (e) => {
    const value = e.target.value;
    setNotesValue(value);
    setNotes(value);
  };

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div className="checkout-payment">
      <h2>Payment Method</h2>

      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <div className="payment-options">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-option ${
                selectedMethod === method.id ? "selected" : ""
              }`}
              onClick={() => handleMethodChange(method.id)}
            >
              <div className="payment-icon">{method.icon}</div>
              <div className="payment-info">
                <span className="payment-name">{method.name}</span>
              </div>
              <div className="payment-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => handleMethodChange(method.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="delivery-notes">
        <h3>Delivery Notes (Optional)</h3>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Any special delivery instructions or notes..."
          rows={4}
        />
      </div>

      <div className="form-actions">
        <Button type="button" onClick={handlePrev} className="btn-secondary">
          Back to Address
        </Button>
        <Button type="button" onClick={handleNext} className="btn-primary">
          Review Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
