// const sendEmail = require("../utils/sendEmail");
const AuthController = require("../controller/AuthController");
const MiddleWareController = require("../controller/MiddleWareController");

const router = require("express").Router();
router.post("/register", AuthController.register);

router.post("/login", AuthController.login);
// router.get("/:id/verify/:token", AuthController.verify)
router.post("/changepassword", MiddleWareController.verifyToken, AuthController.changePassword)



module.exports = router;
