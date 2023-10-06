const CartController = require("../controller/CartController");
const router = require("express").Router();

router.post("/",CartController.addToCart)
router.get("/",CartController.getCart)

module.exports = router;
