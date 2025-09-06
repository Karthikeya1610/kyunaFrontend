import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import API_URLS from "../config/api";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  checkoutStep: 1, // 1: Address, 2: Payment, 3: Confirmation
  shippingAddress: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  },
  paymentMethod: "Credit Card",
  notes: "",
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
        error: null,
      };

    case "SET_ORDERS":
      return {
        ...state,
        orders: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
        error: null,
      };

    case "SET_CURRENT_ORDER":
      return {
        ...state,
        currentOrder: action.payload,
        loading: false,
        error: null,
      };

    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...(state.orders || [])],
        currentOrder: action.payload,
        loading: false,
        error: null,
      };

    case "UPDATE_ORDER":
      return {
        ...state,
        orders: (state.orders || []).map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
        currentOrder:
          state.currentOrder?._id === action.payload._id
            ? action.payload
            : state.currentOrder,
        loading: false,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "SET_CHECKOUT_STEP":
      return {
        ...state,
        checkoutStep: action.payload,
      };

    case "SET_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };

    case "RESET_CHECKOUT":
      return {
        ...state,
        checkoutStep: 1,
        shippingAddress: {
          address: "",
          city: "",
          postalCode: "",
          country: "",
          phone: "",
        },
        paymentMethod: "Credit Card",
        notes: "",
        currentOrder: null,
        error: null,
      };

    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { isAuthenticated, token } = useAuth();

  // Set up axios interceptor for authenticated requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const createOrder = async (orderData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axios.post(API_URLS.ORDERS, orderData);

      dispatch({
        type: "ADD_ORDER",
        payload: response.data,
      });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create order";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const fetchUserOrders = async () => {
    try {
      
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axios.get(API_URLS.MY_ORDERS);

      dispatch({
        type: "SET_ORDERS",
        payload: response.data.orders || [],
      });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch orders";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const fetchOrderById = async (orderId) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axios.get(API_URLS.ORDER_BY_ID(orderId));

      dispatch({
        type: "SET_CURRENT_ORDER",
        payload: response.data,
      });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch order";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const cancelOrder = async (orderId, cancellationReason) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axios.put(API_URLS.CANCEL_ORDER(orderId), {
        cancellationReason,
      });

      dispatch({
        type: "UPDATE_ORDER",
        payload: response.data,
      });

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to cancel order";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const setCheckoutStep = (step) => {
    dispatch({ type: "SET_CHECKOUT_STEP", payload: step });
  };

  const setShippingAddress = (address) => {
    dispatch({ type: "SET_SHIPPING_ADDRESS", payload: address });
  };

  const setPaymentMethod = (method) => {
    dispatch({ type: "SET_PAYMENT_METHOD", payload: method });
  };

  const setNotes = (notes) => {
    dispatch({ type: "SET_NOTES", payload: notes });
  };

  const resetCheckout = () => {
    dispatch({ type: "RESET_CHECKOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value = {
    ...state,
    createOrder,
    fetchUserOrders,
    fetchOrderById,
    cancelOrder,
    setCheckoutStep,
    setShippingAddress,
    setPaymentMethod,
    setNotes,
    resetCheckout,
    clearError,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
