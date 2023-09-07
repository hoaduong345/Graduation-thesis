// const sendEmail = require("../utils/sendEmail"
const AuthController = require("../controller/AuthController");
const MiddleWareController = require("../middleware/MiddleWareController");
const { createVali } = require("../middleware/validateRequest/auth.middleware");
const router = require("express").Router();


// REGISTER
router.post("/register", createVali, AuthController.register);
// LOGIN
router.post("/", AuthController.requestRefreshToken);
router.post(
  "/login",
  MiddleWareController.loginvalidator,
  AuthController.login
);

// VERIFY TOKEN
router.get("/:id/verify/:token", AuthController.verify);
// router.post("/changepassword/:id", MiddleWareController.verifyToken, AuthController.changePassword)

//FORGOT-PASSWORD
router.post("/forgotpassword", AuthController.sendEmailToTakeOTP);

module.exports = router;
