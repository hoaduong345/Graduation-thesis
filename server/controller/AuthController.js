const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
dotenv.config();

const AuthController = {
  // GENERATE ACCESS TOKEN
  genereateAccessToken: (email) => {
    return jwt.sign(
      {
        id: email.id,
      },
      process.env.SECRECT_KEY,
      { expiresIn: "1h" }
    );
  },
  // GENERATE REFRESH TOKEN
  genereateRefreshToken: (email) => {
    return jwt.sign(
      {
        id: email.id,
      },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "365d" }
    );
  },
  // REGISTER
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      if (!req.body.password || !salt) {
        throw new Error("Missing password or salt");
      }

      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: hashed,
      };
      const user = await prisma.user.create({
        data: newUser
      });
      // const token = await prisma.token.create({
      //   userid: user.id,
      //   token: crypto.randomBytes(32).toString("hex"),
      // });
      // const url = `${process.env.BASE_URL}/auth/${user.id}/verify/${token.token}`;
      // await SendEmail(user.email, "Verify email", url);
      console.log("user",user)
      res.status(200).send("Register Successfully");
    } catch (error) {
      console.log("error", error);
    }
  },

  login: async (req, res) => {
    console.log("getUserById");
  },
  changePassword: async (req, res) => {
    console.log("updateUser");
  },
  getAllUser: async (req, res) => {
    console.log("getAllUser");
  },
  // VERIFY ACCOUNT WHEN REGISTER WITH EMAIL
  // verify: async (req, res) => {
  //   try {
  //     const user = await prisma.user.findUnique({
  //       where: {
  //         id: req.params.id,
  //       },
  //     });
  //     if (!user) return res.status(400).send({ message: "invalid link" });
  //     const token = await prisma.token.findUnique({
  //       userid: user.id,
  //       token: req.params.token,
  //     });
  //     await prisma.user.update({ id: user.id, verify: true });
  //     await token.remove();
  //     res.status(200).send({ message: "Email verified successfully" });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({ message: "Internal server error" });
  //   }
  // },
};
module.exports = AuthController;
