const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const decode = require("jwt-decode");
dotenv.config();

let otpRequestAllowed = true;
const AuthController = {
  // GENERATE RANDOM NUMBER
  generateRandomNumbers: (length) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 10);
      otp += randomNumber.toString();
    }
    return otp;
  },

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
  generateForgotPasswordToken: (email) => {
    return jwt.sign(
      {
        email: email,
      },
      process.env.JWT_FORGOT_PASSWORD_TOKEN,
      { expiresIn: "15m" }
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
        name: req.body.name,
        phonenumber: req.body.phonenumber,
      };

      const user = await prisma.user.create({
        data: newUser,
      });
      const token = await prisma.token.create({
        data: {
          userid: user.id,
          token: crypto.randomBytes(32).toString("hex"),
        },
      });

      const url = `${process.env.BASE_URL}/buyzzle/auth/${user.id}/verify/${token.token}`;
      await SendEmail(user.email, "Verify email", url);
      console.log("🚀 ~ file: AuthController.js:83 ~ register: ~ url:", url);
      res
        .status(200)
        .send(
          "Register Successfully, Please check Email to verify your account"
        );
    } catch (error) {
      console.log("error", error);
    }
  },

  // LOGIN
  login: async (req, res) => {
    try {
      const reqpassword = req.body.password;
      const reqemail = req.body.email;
      const user = await prisma.user.findUnique({
        where: { email: reqemail },
      });
      console.log("user email", user.email);
      if (!user.email) {
        return res.status(404).json("wrong email");
      }
      const validPassword = await bcrypt.compare(reqpassword, user.password);

      if (!validPassword) {
        return res.status(404).json("wrong password");
      }

      if (user.verify == false) {
        const token = await prisma.token.findUnique({
          where: { tokenid: user.id },
        });
        if (!token) {
          token = await prisma.token.create({
            id: user.id,
            token: crypto.randomBytes(32).toString("hex"),
          });

          const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;

          await SendEmail(user.email, "Verify email", url);
        }
        return res.status(400).send({
          message: "An email has sent to your email, please check that",
        });
      }

      if (user.email && validPassword) {
        const accessToken = AuthController.genereateAccessToken(user.email);
        const refreshToken = AuthController.genereateRefreshToken(user.email);
        // Save refresh token to the user's record in the database
        await prisma.user.update({
          where: { id: user.id },
          data: { refresh_token: refreshToken },
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnlyCookie: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user;
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  // CHANGE PASSWORD
  changePassword: async (req, res) => {
    console.log("aaaaaaaaa")
    try {
      console.log("bbbbbbbbb")
      const token = req.params.token;
      const decoded = decode(token);
       await prisma.user.update({
        where: {
          email: decoded.email,
        },
        data: {
          password: req.body.newPassword,
        },
      });

      await prisma.user.update({
        where:{
          email: decoded.email
        },
        data:{
          forgotpassword_token: null
        }
      })
      res.status(200).send("Change password successfully")
    } catch (error) {
      res.status(500).send("Something when Wrong")
    }
  },

  // SEND EMAIL TO FORGOT PASSWORD
  fogotPassword: async (req, res) => {
    try {
      const reqemail = req.body.email;
      const user = await prisma.user.findUnique({
        where: {
          email: reqemail,
        },
      });

      if (!user) {
        return res.status(404).send("Email is not true");
      }

      const forgot_password_token = AuthController.generateForgotPasswordToken(
        user.email
      );
      console.log(
        "🚀 ~ file: AuthController.js:225 ~ fogotPassword: ~ forgot_password_token:",
        forgot_password_token
      );
      await prisma.user.update({
        where: { id: user.id },
        data: { forgotpassword_token: forgot_password_token },
      });
      const url = `${process.env.BASE_URL}/buyzzle/auth/forgot-password/${user.forgotpassword_token}`;
      // await SendEmail(user.email, "Forgot Password", url);

      res.cookie("email", user.email, {
        maxAge: 10 * 60 * 1000, // 10 minutes in milliseconds
      });
      res.status(200).send("A Link has sent to your email");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },
  // CHANGE PASSWORD WITH OTP FROM EMAIL
  resetPassword: async (req, res) => {
    try {
      const oldPassword = req.body.oldPassword
      const newPassword = req.body.newPassword

      

    } catch (error) {
      
    }
    
  },
  // REQUEST REFRESH AND ACCESS TOKEN
  requestRefreshToken: async (req, res) => {
    // take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You are not authenticated");
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, email) => {
      if (err) {
        console.log(err);
      }
      // create new access token, refresh token
      const newAccesstoken = AuthController.genereateAccessToken(email);
      const newRefrestoken = AuthController.genereateRefreshToken(email);
    });
    res.status(200).json({ accessToken: newAccesstoken });
  },

  // VERIFY ACCOUNT WHEN REGISTER WITH EMAIL
  verify: async (req, res) => {
    try {
      const userID = parseInt(req.params.id);
      const tokenreq = req.params.token;

      const user = await prisma.user.findUnique({
        where: { id: userID },
      });

      if (!user) return res.status(400).send({ message: "invalid link" });

      const token = await prisma.token.findUnique({
        where: {
          userid: user.id,
          token: tokenreq,
        },
      });
      if (!token) {
        return res.status(400).send({ message: "Invalid token" });
      }
      await prisma.user.update({
        where: { id: userID },
        data: { verify: true },
      });

      await prisma.token.delete({
        where: {
          userid: user.id,
          token: req.params.token,
        },
      });
      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
module.exports = AuthController;
