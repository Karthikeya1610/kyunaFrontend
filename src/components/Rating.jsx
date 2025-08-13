import React from "react";
import "./Rating.scss";

const Rating = ({
  rating,
  totalReviews,
  showBreakdown = false,
  breakdown = {},
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="rating__star rating__star--full">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="rating__star rating__star--half">
          ☆
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="rating__star rating__star--empty">
          ☆
        </span>
      );
    }

    return stars;
  };

  const renderBreakdown = () => {
    if (!showBreakdown || !breakdown) return null;

    return (
      <div className="rating__breakdown">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="rating__breakdown-row">
            <span className="rating__breakdown-stars">{star} ★</span>
            <div className="rating__breakdown-bar">
              <div
                className="rating__breakdown-fill"
                style={{ width: `${breakdown[star] || 0}%` }}
              ></div>
            </div>
            <span className="rating__breakdown-percentage">
              {breakdown[star] || 0}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="rating">
      <div className="rating__main">
        <div className="rating__stars">{renderStars(rating)}</div>
        <span className="rating__score">{rating}</span>
        <span className="rating__total">/5</span>
        {totalReviews && (
          <span className="rating__reviews">({totalReviews} reviews)</span>
        )}
      </div>
      {renderBreakdown()}
    </div>
  );
};

export default Rating;
