/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import "./ManagerProduct.scss";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import apiProduct from "../../api/apiProduct";
import useLoading from "../../hooks/useLoading";
import { CardProduct, Modal, ModalContent } from "../../components";
import AddProduct from "./components/AddProduct";
import { number } from "../../const";

const ManagerProduct = () => {
  const [product, setProduct] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [totalPage, setTotalPage] = useState(0);
  const [showLoader, hideLoader] = useLoading();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openContentModal, setOpenContentModal] = useState(false);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number(params.page) || 1,
      limit: Number(params.limit) || number.limitDefault,
    };
  }, [location.search]);

  const fetchData = async () => {
    const { products, count } = await apiProduct.getAllProduct(queryParams);
    setTotalPage(Math.ceil(count / queryParams.limit)); // return number max
    setProduct(products);
  };

  useEffect(() => {
    showLoader();
    fetchData();
    setLoading(true);
    hideLoader();
  }, [queryParams, openContentModal]);

  const handleChangeSearch = (e) => {
    if (e.target.value === "") {
      delete queryParams.search;
    }
    const input = e.currentTarget.value;
    if (/^[a-zA-Z0-9 ]+$/.test(input) || input === "") {
      setValue(input);
    }
    setTimeout(() => {
      history.push({
        pathname: location.pathname,
        search: queryString.stringify({
          ...queryParams,
          page: 1,
          limit: number.limitDefault,
          search: e.target.value,
        }),
      });
    }, number.timeSearch);
  };

  const handleOnPageChange = (e, crPage) => {
    history.push({
      pathname: location.pathname,
      search: queryString.stringify({ ...queryParams, page: crPage }),
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenContentModal(false);
  };

  const handleOnSubmit = async (values, image) => {
    const { name, category, categoryType, price, description } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("categoryType", categoryType);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image, image.name);
    try {
      const dataProductAdd = await apiProduct.addProduct(formData); //
      setOpenContentModal(true);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="content">
      <div className="content-header">
        <button
          type="button"
          className="content-header__btn"
          onClick={handleClickOpen}
        >
          Thêm sản phẩm
        </button>
        <Modal open={open} onClose={handleClose}>
          <AddProduct onClickClose={handleClose} onSubmit={handleOnSubmit} />
        </Modal>
        <Modal open={openContentModal} onClose={handleClose}>
          <ModalContent
            onClickClose={handleClose}
            title="Thêm thành công "
            image="./success.png"
          />
        </Modal>
        <div className="content-header__search">
          <i className="bx bx-search" />
          <input
            value={value}
            onChange={handleChangeSearch}
            type="text"
            placeholder="Search ..."
          />
        </div>
      </div>
      <div className="content-body">
        <Grid className="content-body__list" container direction="row">
          {product.length > 0 ? (
            <>
              {product?.map((item) => (
                <CardProduct
                  key={item._id}
                  image={item.image}
                  title={item.name}
                />
              ))}
            </>
          ) : (
            <span className="content-body__notFound">
              Không có sản phẩm nào
            </span>
          )}
        </Grid>
        {product.length > 0 && loading ? (
          <div className="content-body__pagination">
            <Pagination
              count={totalPage}
              variant="outlined"
              shape="rounded"
              onChange={handleOnPageChange}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ManagerProduct;
