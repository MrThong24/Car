import React from "react";
import { useController } from "react-hook-form";
import "./Input.scss";
// eslint-disable-next-line object-curly-newline
const Input = ({ name = "", type = "text", control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <input className="input" id={name} type={type} {...field} {...props} />
  );
};

export default Input;
