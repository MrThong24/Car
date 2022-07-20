const express = require('express');
const { productController } = require('../../controllers');

const router = express.Router();

router.route('/').get(productController.getAllProducts);

module.exports = router;
