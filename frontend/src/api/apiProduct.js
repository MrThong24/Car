import axiosInstance from "./axios";

const apiProduct = {
  getAllProduct(queryParams) {
    return axiosInstance.get("/product", {
      params: queryParams,
    });
  },
  async addProduct(formdata) {
    const dataProduct = await axiosInstance.post("/product", formdata, {
      headers: { "content-type": "multipart/form-data" },
    });
    return dataProduct;
  },
};
export default apiProduct;
