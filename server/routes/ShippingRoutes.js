const ShippingController = require("../controller/ShippingController");
const router = require('express').Router();

router.post("/", ShippingController.setStatus);
router.get("/", ShippingController.getAllStatusForDelivery);
router.get("/sort", ShippingController.sortByStatus);
router.post("/search", ShippingController.searchWithNameAndOrderId);
router.post("/delete", ShippingController.requestDeleteOrder);

module.exports = router;
