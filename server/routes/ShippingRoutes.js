const ShippingController = require("../controller/ShippingController");
const router = require('express').Router();

router.post("/", ShippingController.setStatusTo1)



module.exports = router