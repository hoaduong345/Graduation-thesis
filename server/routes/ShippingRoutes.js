const ShippingController = require("../controller/ShippingController");
const router = require('express').Router();

router.post("/", ShippingController.setStatus)
router.get("/",ShippingController.getAllStatus)


module.exports = router