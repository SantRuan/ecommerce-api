const express = require("express")
const router = express.Router();
const multer = require("multer")
const orderController = require("../controllers/orderController")

router.post('/new-order')
router.get('/get-order')
router.patch('/changing-order')
router.delete('delete-order')