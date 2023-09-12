// const sendEmail = require("../utils/sendEmail"
const AuthController = require("../controller/AuthController");
const MiddleWareController = require("../middleware/MiddleWareController");
const {checkTokenForgotPassword} = require("../middleware/validateRequest/token.middleware")
const {createVali,FogotPasswordValid} = require("../middleware/validateRequest/auth.middleware");
const router = require("express").Router();

// REGISTER
router.post("/register",createVali, AuthController.register);
// LOGIN
router.post("/", AuthController.requestRefreshToken);
router.post(
  "/login",
  MiddleWareController.loginvalidator,
  AuthController.login
);

// VERIFY TOKEN
router.post("/:id/verify/:token", AuthController.verify);
// VERIFY FORGOTPASSWORD_TOKEN
// router.post("/verify-forgot-password/:token", AuthController.verifyTokenForgotPassword);

router.post(
  "/changepassword/:token",
  checkTokenForgotPassword,
  FogotPasswordValid,
  AuthController.changePassword
);

//FORGOT-PASSWORD
router.post("/forgotpassword", AuthController.fogotPassword);

module.exports = router;
