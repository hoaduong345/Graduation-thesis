const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
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
  loginvalidator: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing Email or password",
      });
    }

    next();
  },
};
module.exports = MiddleWareController;
