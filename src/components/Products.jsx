import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";
import Context from "../context/context";
import "./Products.scss";

const Products = () => {
  const navigate = useNavigate();
  const { products, getItems, selectedCategory } = useContext(Context);

  useEffect(() => {
    if (!products?.items) {
      getItems(1, false);
    }
  }, []);

  const fetchMoreData = () => {
    const pagination = products?.pagination;
    const hasMore =
      pagination?.hasNextPage ||
      pagination?.currentPage < pagination?.totalPages;
    const loading = products?.loading;

    if (hasMore && !loading) {
      console.log(
        `Loading page ${pagination?.currentPage + 1} of ${
          pagination?.totalPages
        }`
      );
      getItems(pagination?.currentPage + 1, true);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (products?.loading) {
    return (
      <section className="products">
        <div className="products__container">
          <div className="products__loading">
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  // Debug: Log all products and their categories
  console.log(
    "📦 All products:",
    products?.items?.map((p) => ({ name: p.name, category: p.category }))
  );
  console.log("🏷️ Selected category:", selectedCategory);

  return (
    <section className="products">
      <div className="products__container">
        <InfiniteScroll
          dataLength={products?.items?.length || 0}
          next={fetchMoreData}
          hasMore={
            products?.pagination?.hasNextPage ||
            products?.pagination?.currentPage < products?.pagination?.totalPages
          }
          loader={
            <div className="products__loading-more">
              <p>Loading more products...</p>
            </div>
          }
          endMessage={
            <div className="products__end">
              <p>
                You've reached the end! ({products?.pagination?.totalItems || 0}{" "}
                products loaded)
              </p>
            </div>
          }
          scrollThreshold={0.8}
          style={{ overflow: "visible" }}
        >
          <div className="products__grid">
            {products?.items && products.items.length > 0 ? (
              products.items
                .filter((product) => {
                  // If no category is selected, show all products
                  if (!selectedCategory) return true;

                  // Filter by selected category name (case insensitive)
                  const productCategory = product.category
                    ?.toLowerCase()
                    .trim();
                  const selectedCategoryName = selectedCategory.name
                    ?.toLowerCase()
                    .trim();

                  console.log(
                    "🔍 Filtering product:",
                    product.name,
                    "| Product Category:",
                    productCategory,
                    "| Selected Category:",
                    selectedCategoryName,
                    "| Match:",
                    productCategory === selectedCategoryName
                  );

                  // Check if product name contains the category name (fallback)
                  // Only use fallback if the product category is empty or undefined
                  const productNameContainsCategory =
                    !productCategory &&
                    product.name?.toLowerCase().includes(selectedCategoryName);

                  return (
                    productCategory === selectedCategoryName ||
                    productNameContainsCategory
                  );
                })
                .map((product) => (
                  <div
                    key={product._id || product.id}
                    onClick={() =>
                      handleProductClick(product._id || product.id)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
            ) : (
              <div className="products__empty">
                <p>No products found</p>
              </div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default Products;
