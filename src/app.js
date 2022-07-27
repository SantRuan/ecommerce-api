const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./routes/usersRoutes");
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const login = require('./middleware/login')
const path = require('path')
require("dotenv").config();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoute)
app.use("/product", productRoutes)
app.use("/order", orderRoutes)

app.listen(3000, () => {
  console.log("Servidor Rodando");
});
