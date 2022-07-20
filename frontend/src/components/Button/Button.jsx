/* eslint-disable react/button-has-type */
/* eslint-disable object-curly-newline */
import React from "react";
import "./Button.scss";

const STYLE = [
  "btn--success-outline",
  "btn--error-outline",
  "btn--close-addProduct",
  "btn--add-addProduct",
];
const SIZES = ["btn--addProduct", "btn--medium", "btn--small"];

const Button = ({ type = "button", children, buttonSize, buttonStyle }) => {
  const checkButtonStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  return (
    <button
      type={type}
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
    >
      {children}
    </button>
  );
};

export default Button;
