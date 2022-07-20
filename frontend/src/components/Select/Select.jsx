/* eslint-disable object-curly-newline */
import React from "react";
import { useController } from "react-hook-form";
import "./Select.scss";

const Select = ({ options, name, control, defaultValue }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "" || defaultValue,
  });
  return (
    <select {...field} className="select">
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Select;
