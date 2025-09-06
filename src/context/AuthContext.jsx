import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import API_URLS from "../config/api";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
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

    default:
      return state;
  }
};

// Load auth data from localStorage
const loadAuthFromStorage = () => {
  try {
    const savedAuth = localStorage.getItem("kyuna-auth");
    if (savedAuth) {
      const { user, token } = JSON.parse(savedAuth);
      return { user, token, isAuthenticated: true };
    }
  } catch (error) {
    console.error("Error loading auth from localStorage:", error);
  }
  return { user: null, token: null, isAuthenticated: false };
};

// Save auth data to localStorage
const saveAuthToStorage = (user, token) => {
  try {
    localStorage.setItem("kyuna-auth", JSON.stringify({ user, token }));
  } catch (error) {
    console.error("Error saving auth to localStorage:", error);
  }
};

// Remove auth data from localStorage
const removeAuthFromStorage = () => {
  try {
    localStorage.removeItem("kyuna-auth");
  } catch (error) {
    console.error("Error removing auth from localStorage:", error);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    ...initialState,
    ...loadAuthFromStorage(),
  });

  // Set up axios interceptor for authenticated requests
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [state.token]);

  const login = async (email, password) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axios.post(`${API_URLS.LOGIN}`, {
        email,
        password,
      });

      const { user, token } = response.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token },
      });

      saveAuthToStorage(user, token);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const register = async (name, email, phoneNumber, password) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axios.post(`${API_URLS.REGISTER}`, {
        name,
        email,
        phoneNumber,
        password,
      });

      const { user, token } = response.data;

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { user, token },
      });

      saveAuthToStorage(user, token);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    removeAuthFromStorage();
    // Clear all localStorage data
    clearAllLocalStorage();
  };

  // Function to clear all localStorage data
  const clearAllLocalStorage = () => {
    try {
      // Clear all known localStorage keys
      localStorage.removeItem("kyuna-auth");
      localStorage.removeItem("kyuna-cart");
      localStorage.removeItem("token");

      // Clear any other localStorage items that might exist
      // This is a more thorough approach to ensure everything is cleared
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("kyuna-") || key === "token")) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
