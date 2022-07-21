const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const httpStatus = require('http-status');

const getAllProducts = catchAsync(async (req, res) => {
  const { products, count } = await productService.getProducts(req.query);
  res.send({ products, count });
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body, req.file.filename);
  res.status(httpStatus.CREATED).send(product);
});

module.exports = {
  getAllProducts,
  createProduct,
};
