const express = require('express');
const app = express();
const OrderController = require("../controller/OrderController")


app.post("/",OrderController.createOrder)
app.get("/",OrderController.getOrderDetails)

module.exports = app;