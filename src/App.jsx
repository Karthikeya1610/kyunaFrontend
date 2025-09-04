import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import ProductView from "./components/ProductView";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
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
    <CartProvider>
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
