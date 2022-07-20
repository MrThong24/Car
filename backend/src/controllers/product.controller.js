const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const getAllProducts = catchAsync(async (req, res) => {
  const { products, count } = await productService.getProducts(req.query);
  res.send({ products, count });
});

module.exports = {
  getAllProducts,
};
