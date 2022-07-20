import React, { useEffect, useMemo, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import "./ManagerProduct.scss";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import apiProduct from "../../api/apiProduct";
import useLoading from "../../hooks/useLoading";
import { CardProduct } from "../../components";
import { number } from "../../const";

const ManagerProduct = () => {
  const [product, setProduct] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [totalPage, setTotalPage] = useState(0);
  const [showLoader, hideLoader] = useLoading();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
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
    setTotalPage(Math.ceil(count / queryParams.limit));
    setProduct(products);
  };

  useEffect(() => {
    showLoader();
    fetchData();
    setLoading(true);
    hideLoader();
  }, [queryParams]);

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

  return (
    <div className="content">
      <div className="content-header">
        <button type="button" className="content-header__btn">
          Thêm sản phẩm
        </button>

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
        <Grid
          className="content-body__list"
          container
          // eslint-disable-next-line object-curly-newline
          direction="row"
        >
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
