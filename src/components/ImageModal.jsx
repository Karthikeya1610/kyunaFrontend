import React from "react";
import "./ImageModal.scss";

const ImageModal = ({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  onImageChange,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePrevious = () => {
    const newIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    onImageChange(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    onImageChange(newIndex);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowLeft") {
      handlePrevious();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [currentImageIndex]);

  const currentImage = images[currentImageIndex];

  return (
    <div className="image-modal" onClick={handleBackdropClick}>
      <div className="image-modal__content">
        {/* Close Button */}
        <button className="image-modal__close" onClick={onClose}>
          ×
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              className="image-modal__nav image-modal__nav--prev"
              onClick={handlePrevious}
            >
              ‹
            </button>
            <button
              className="image-modal__nav image-modal__nav--next"
              onClick={handleNext}
            >
              ›
            </button>
          </>
        )}

        {/* Main Image */}
        <div className="image-modal__image-container">
          <img
            src={currentImage?.url || currentImage}
            alt={`Product view ${currentImageIndex + 1}`}
            className="image-modal__image"
          />
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="image-modal__counter">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="image-modal__thumbnails">
            {images.map((image, index) => (
              <div
                key={index}
                className={`image-modal__thumbnail ${
                  index === currentImageIndex
                    ? "image-modal__thumbnail--active"
                    : ""
                }`}
                onClick={() => onImageChange(index)}
              >
                <img
                  src={image?.url || image}
                  alt={`Thumbnail ${index + 1}`}
                  className="image-modal__thumbnail-image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
