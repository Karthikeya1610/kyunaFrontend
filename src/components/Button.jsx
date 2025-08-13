import React from "react";
import "./Button.scss";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  fullWidth = false,
  type = "button",
}) => {
  const buttonClasses = `button button--${variant} button--${size} ${
    fullWidth ? "button--full-width" : ""
  }`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
