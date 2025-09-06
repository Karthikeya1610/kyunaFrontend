import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import ProductView from "./components/ProductView";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import OrderCancel from "./components/OrderCancel";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfileSettings from "./components/ProfileSettings";
import "./App.scss";

function HomePage() {
  return (
    <>
      <Categories />
      <Products />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <Router>
            <div className="app">
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <main className="main">
                        <HomePage />
                      </main>
                    </>
                  }
                />
                <Route
                  path="/product/:productId"
                  element={
                    <main className="main">
                      <ProductView />
                    </main>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <main className="main">
                      <Cart />
                    </main>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <main className="main">
                      <Checkout />
                    </main>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <main className="main">
                      <Orders />
                    </main>
                  }
                />
                <Route
                  path="/orders/:orderId/cancel"
                  element={
                    <main className="main">
                      <OrderCancel />
                    </main>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfileSettings />} />
              </Routes>
            </div>
          </Router>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
