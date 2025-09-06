import React, { useState, useRef, useContext, useEffect } from "react";
import Context from "../context/context";

import "./Categories.scss";

const Categories = () => {
  const {
    categories,
    getCategories,
    selectedCategory,
    setSelectedCategory,
    clearSelectedCategory,
  } = useContext(Context);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  // const categories = [
  //   {
  //     id: 1,
  //     name: "Bracelets",
  //     image:
  //       "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 2,
  //     name: "Earrings",
  //     image:
  //       "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 3,
  //     name: "Necklaces",
  //     image:
  //       "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 4,
  //     name: "Rings",
  //     image:
  //       "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 5,
  //     name: "Anklets",
  //     image:
  //       "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 6,
  //     name: "Brooches",
  //     image:
  //       "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 7,
  //     name: "Hairpins",
  //     image:
  //       "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 8,
  //     name: "Pendants",
  //     image:
  //       "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 9,
  //     name: "Chokers",
  //     image:
  //       "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 10,
  //     name: "Cufflinks",
  //     image:
  //       "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop",
  //   },
  // ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
      updateArrowVisibility();
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
      updateArrowVisibility();
    }
  };

  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = () => {
    updateArrowVisibility();
  };

  const handleCategoryClick = (category) => {
    console.log("Category clicked:", category);
    if (selectedCategory && selectedCategory._id === category._id) {
      // If clicking the same category, clear the selection
      console.log("Clearing category selection");
      clearSelectedCategory();
    } else {
      // Select the new category
      console.log("Setting selected category:", category.name);
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        await getCategories();
      } catch (err) {
        setError("Failed to load categories");
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="categories">
      <div className="categories__container">
        <div className="categories__breadcrumb">
          <span>Jewelry</span>
          <span className="categories__separator">/</span>
          <span className="categories__current">Fine Jewelry</span>
        </div>

        <div className="categories__description">
          <p>
            Modern classics handcrafted perfection. The contemporary design and
            craftsmanship will be adored for years to come.
          </p>
        </div>

        <div className="categories__scroll-container">
          {showLeftArrow && (
            <button
              className="categories__scroll-arrow categories__scroll-arrow--left"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              ‹
            </button>
          )}

          <div
            className="categories__filters"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {loading ? (
              <div className="categories__loading">Loading categories...</div>
            ) : error ? (
              <div className="categories__error">{error}</div>
            ) : categories && categories.length > 0 ? (
              <>
                <div
                  className={`categories__filter-card ${
                    !selectedCategory ? "categories__filter-card--selected" : ""
                  }`}
                  onClick={clearSelectedCategory}
                  style={{ cursor: "pointer" }}
                >
                  <div className="categories__filter-image">
                    <img
                      src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=200&h=200&fit=crop"
                      alt="All Categories"
                      className="categories__filter-img"
                    />
                  </div>
                  <h3 className="categories__filter-name">All</h3>
                </div>
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className={`categories__filter-card ${
                      selectedCategory && selectedCategory._id === category._id
                        ? "categories__filter-card--selected"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(category)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="categories__filter-image">
                      <img
                        src={
                          category.image ||
                          "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=200&h=200&fit=crop"
                        }
                        alt={category.name}
                        className="categories__filter-img"
                      />
                    </div>
                    <h3 className="categories__filter-name">{category.name}</h3>
                  </div>
                ))}
              </>
            ) : (
              <div className="categories__no-data">No categories available</div>
            )}
          </div>

          {showRightArrow && (
            <button
              className="categories__scroll-arrow categories__scroll-arrow--right"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              ›
            </button>
          )}
        </div>

        <div className="categories__sorting">
          <div className="categories__sort-item">
            <label htmlFor="price-sort">Price</label>
            <select id="price-sort" className="categories__sort-select">
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>

          <div className="categories__sort-item">
            <label htmlFor="featured-sort">Featured</label>
            <select id="featured-sort" className="categories__sort-select">
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
