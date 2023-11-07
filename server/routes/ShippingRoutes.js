const ShippingController = require("../controller/ShippingController");
const router = require('express').Router();

router.post("/", ShippingController.setStatus);
router.get("/", ShippingController.getAllStatusForDelivery);
router.post("/delete", ShippingController.requestDeleteOrder);

module.exports = router;
