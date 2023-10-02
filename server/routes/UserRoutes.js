// const sendEmail = require("../utils/sendEmail"
const UserController = require("../controller/UserController");
const MiddleWareController = require("../middleware/MiddleWareController");
const { checkTokenForgotPassword } = require("../middleware/validateRequest/token.middleware")
const { createVali, FogotPasswordValid, ResetPasswordValid } = require("../middleware/validateRequest/auth.middleware");
const router = require("express").Router();

// REGISTER

router.delete("/deleteregister/:id", UserController.deleteregister);

router.put("/userprofile/:username", UserController.UserProfile);

router.put("/updatepassword/:id", UserController.UpdatePassword);

router.get("/chitietuser/:username", UserController.getUser);

module.exports = router;
