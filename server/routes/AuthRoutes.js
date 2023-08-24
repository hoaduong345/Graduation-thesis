// const sendEmail = require("../utils/sendEmail");
const AuthController = require("../controller/AuthController");

const router = require("express").Router();
router.post("/register", AuthController.register);

router.post("/login", AuthController.login);
// router.get("/:id/verify/:token", AuthController.verify)


module.exports = router;
