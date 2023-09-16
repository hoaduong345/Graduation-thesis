const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const decode = require("jwt-decode");
const { Console } = require("console");
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
        email: email,
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
        if (!user.refresh_token) {
          // Save refresh token to the user's record in the database
          await prisma.user.update({
            where: { id: user.id },
            data: { refresh_token: refreshToken },
          });
        }

        res.cookie("refreshToken", refreshToken, {
          httpOnlyCookie: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.cookie("accessToken", accessToken, {
          httpOnlyCookie: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user;
        console.log("Login successfully");
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  // RESET PASSWORD

  resetPassword: async (req, res) => {
    try {
      const token = req.params.token;

      const decoded = decode(token);
      const salt = await bcrypt.genSalt(10);
      if (!req.body.newPassword || !salt) {
        throw new Error("Missing password or salt");
      }
      const hashed = await bcrypt.hash(req.body.newPassword, salt);
      await prisma.user.update({
        where: {
          email: decoded.email,
        },
        data: {
          password: hashed,
        },
      });

      await prisma.user.update({
        where: {
          email: decoded.email,
        },
        data: {
          forgotpassword_token: null,
        },
      });
      res.status(200).send("Change password successfully");
    } catch (error) {
      res.status(500).send("Something when Wrong");
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
      if (user.verify == false) {
        return res
          .status(400)
          .send("You are not verify account, please check your Email");
      }
      const forgot_password_token = AuthController.generateForgotPasswordToken(
        user.email
      );

      await prisma.user.update({
        where: { id: user.id },
        data: { forgotpassword_token: forgot_password_token },
      });
      const url = `${process.env.BASE_URL_FORGOTPASSWORD}/buyzzle/auth/forgotpassword/${user.forgotpassword_token}`;
      // await SendEmail(user.email, "Forgot Password", url);
      console.log(url);
      res.status(200).send(url);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
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
  //CHANGE PASSWORD
  changePassword: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;
      const token = decode(accessToken);

      const user = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });
      const isValidPassword = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );

      if (!isValidPassword) {
        return res.status(404).send("Old Password is not valid");
      }

      const salt = await bcrypt.genSalt(10);
      if (!req.body.newPassword || !salt) {
        throw new Error("Missing password or salt");
      }
      const hashed = await bcrypt.hash(req.body.newPassword, salt);

      await prisma.user.update({
        where: {
          email: token.email,
        },
        data: {
          password: hashed,
        },
      });
      const refreshTokenPayload = {
        email: token.email,
      };
      const newRefreshToken = jwt.sign(
        refreshTokenPayload,
        process.env.JWT_REFRESH_TOKEN,
        {
          expiresIn: token.exp - Math.floor(Date.now() / 1000), // Calculate the remaining time of the old token
        }
      );
      console.log(
        "🚀 ~ file: AuthController.js:324 ~ changePassword: ~ newRefreshToken:",
        newRefreshToken
      );
      await prisma.user.update({
        where: {
          email: token.email,
        },
        data: {
          password: hashed,
          refreshToken: newRefreshToken,
        },
      });
      res.status(200).send("Change Password Successfully");
    } catch (error) {
      res.status(404).send("Change Password Failed");
    }
  },
  // LOG OUT
  logout: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;
      const token = decode(accessToken);

      const user = await prisma.user.update({
        where: {
          email: token.email,
        },
        data: {
          refresh_token: null,
        },
      });
      console.log("user", user);
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      // localStorage.clear();
      res.status(200).send("Logged out successfully");
    } catch (error) {
      res.status(500).send("Logout failed");
    }
  },
};
module.exports = AuthController;
