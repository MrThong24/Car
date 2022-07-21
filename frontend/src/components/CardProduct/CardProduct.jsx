import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "../Button/Button";
import "./CardProduct.scss";

const CardProduct = ({ image, title }) => {
  return (
    <Card sx={{ maxWidth: 259 }} className="card-body">
      <CardContent className="card-body__items">
        <img
          className="card-body__image"
          src={`http://localhost:5000/v1/${image}`}
          alt=""
        />
        <h2 className="card-body__name">{title}</h2>
        <div className="card-body__action">
          <Button type="button" buttonStyle="btn--success-outline">
            Cập nhật
          </Button>
          <Button type="button" buttonStyle="btn--error-outline">
            Xóa
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProduct;
