const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const decode = require("jwt-decode");
const cookieParser = require("cookie-parser");

dotenv.config();

const MiddleWareController = {
  // VERIFY TOKEN
  verifyAuthenticate: (req, res, next) => {
    const token = req.cookies.accesstoken;
    if (token) {
      jwt.verify(token, process.env.SECRECT_KEY, (err, user) => {
        if (err) {
          console.log("Token is not valid1:"+err);

          return res.status(401).json({ message: `Unauthorized:${token}` });
        }
        req.user = user;
        console.log("Cookies:"+token);
        next();
      });
    } else {
      console.log("You are not authenticated "+token);
      return res.status(401).json({ message: "Unauthorized" });
    }
  },

  loginvalidator: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).send("missing Email or Password");
    }
    next();
  },
};
module.exports = MiddleWareController;
