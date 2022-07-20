import React from "react";
import "./Label.scss";

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <div className="label" htmlFor={htmlFor} {...props}>
      {children}
    </div>
  );
};

export default Label;
