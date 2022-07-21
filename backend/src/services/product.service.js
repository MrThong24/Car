const { Product } = require('../models');
// const ApiError = require('../utils/ApiError');
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<product>}
 */

const getProducts = async (query) => {
  const filter = {};
  if (query.search) {
    const { search } = query;
    const reqSearch = new RegExp(`${search}`);
    filter.name = { $regex: reqSearch, $options: 'i' };
  }
  if (query.category) {
    filter.category = query.category;
  }
  if (query.categoryType) {
    filter.categoryType = query.categoryType;
  }
  const count = await Product.countDocuments(filter);
  const page = query.page * 1 || 1;
  const limit = query.limit * 1 || 6; // limit
  const skip = limit * (page - 1);
  const products = await Product.find(filter)
    .limit(limit)
    .skip(skip)
    .populate({ path: 'category' })
    .populate({ path: 'categoryType' });
  return { products, count };
};

const createProduct = async (body, file) => {
  const objectValue = { ...body, image: file };
  const product = await Product.create(objectValue);
  return product;
};

module.exports = {
  getProducts,
  createProduct,
};
