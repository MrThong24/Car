const express = require('express');
const { productController } = require('../../controllers');
const upload = require('../../middlewares/uploadFile');

const router = express.Router();

router.route('/').get(productController.getAllProducts);
router.post('/', upload.single('image'), productController.createProduct);

module.exports = router;
