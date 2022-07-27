const express = require("express");
const router = express.Router();
const multer = require('multer')
const productController = require('../controllers/productController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 5
  }
});


router.post('/createproduct', upload.single('productImage'), productController.createProduct)
router.get('/findproduct', productController.getProduct)
router.get('/imageproduct', productController.getImage)
router.patch('/modifyproduct', productController.modifyProduct)
router.post('/deleteproduct', productController.deleteProduct)
router.get('/showproducts', productController.allProducts)

module.exports = router