import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import "./Products.scss";

const Products = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="products">
      <div className="products__container">
        <div className="products__grid">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: "pointer" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
