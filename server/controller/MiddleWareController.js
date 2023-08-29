const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const MiddleWareController = {
  // VERIFY TOKEN
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
    
      jwt.verify(token, process.env.SECRECT_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated");
    }
  },
};
module.exports = MiddleWareController;
