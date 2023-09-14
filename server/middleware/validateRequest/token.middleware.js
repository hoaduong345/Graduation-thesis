const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const decode = require("jwt-decode");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { error } = require("console");

// VERIFY FORGOT PASSWORD TOKEN
const checkTokenForgotPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const decoded = decode(token);
    const error = {};
    const user = await prisma.user.findUnique({
      where: {
        email: decoded.email,
        forgotpassword_token: token,
      },
    });
    if (!user) {
      error.user = "Username is already not valid!";
    }
    next();
  } catch (error) {
    console.log("Something when wrong");
  }
};

module.exports = {
  checkTokenForgotPassword,
};
