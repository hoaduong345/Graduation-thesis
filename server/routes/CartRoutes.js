const CartController = require("../controller/CartController");
const router = require("express").Router();

router.post("/cart",CartController.addToCart)
router.get("/cart",CartController.getCart)

module.exports = router;
