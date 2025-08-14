import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import ProductView from "./components/ProductView";
import Cart from "./components/Cart";
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
          <Hero />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:productId" element={<ProductView />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
