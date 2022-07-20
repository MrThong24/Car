import axiosInstance from "./axios";

const apiProduct = {
  getAllProduct(queryParams) {
    return axiosInstance.get("/product", {
      params: queryParams,
    });
  },
};
export default apiProduct;
