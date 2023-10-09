const CartController = require("../controller/CartController");
const router = require("express").Router();


router.post("/",CartController.addToCart)
router.get("/",CartController.getCart)
// DELETE ITEM
router.delete("/:id", CartController.deleteItem)
// DELETE all item on cart
router.delete("/", CartController.deleteCart)

module.exports = router;
