const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.userCreate);
router.get("/", userController.LogIn);
module.exports = router;
