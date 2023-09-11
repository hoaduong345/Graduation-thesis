const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
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
        id: email.id,
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

      const url = `${process.env.BASE_URL}/auth/${user.id}/verify/${token.token}`;
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

          // await SendEmail(user.email, "Verify email", url);
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
  // changePassword: async (req, res) => {
  //   console.log("aaaaaaaaa")
  //  try {
  //   const { id } = req.user;
  //   const { new_password, password } = req.body;

  //   const user = await prisma.user.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   console.log("🚀 ~ file: AuthController.js:145 ~ changePassword: ~ user:", user)

  //   if (!user) {
  //     return res.status(404).json({
  //       msg: "User not found.",
  //     });
  //   }
  //   const compareOldPwd = await bcrypt.compareSync(password, user.password);
  //   console.log("🚀 ~ file: AuthController.js:153 ~ changePassword: ~ compareOldPwd:", compareOldPwd)

  //   if (!compareOldPwd) {
  //     return res.status(409).send({
  //       msg: "old password is incorrect!",
  //     });
  //   }

  //   const hashPassword = bcrypt.hashSync(new_password, SALT_ROUNDS);
  //   const update_user = await prisma.user.update({
  //     where: {
  //       id: user.id,
  //     },
  //     data: {
  //       password: hashPassword,
  //     },
  //   });
  //   console.log("🚀 ~ file: AuthController.js:170 ~ changePassword: ~ update_user:", update_user)
  //   if (!update_user) {
  //     return res.status(400).json({
  //       status: httpStatus.getStatus(400),
  //       msg: "Reset password is failed!",
  //     });
  //   }

  //   logger.debug("resetPassword - END");
  //   return res.status(200).json({
  //     status: httpStatus.getStatus(200),
  //     msg: "Reset password is successful!",
  //   });
  //  } catch (error) {
  //     res.status(500).json("Change password failed")
  //  }
  // },

  // SEND EMAIL TO FORGOT PASSWORD
  sendEmailToTakeOTP: async (req, res) => {
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
      await prisma.user.update({
        where: { id: user.id },
        data: { forgotpassword_token: forgot_password_token },
      });
      const url = `${process.env.BASE_URL}/auth/forgot-password/${token.token}`;
      await SendEmail(user.email, "Forgot Password", url);
      res.cookie("email", user.email, {
        maxAge: 10 * 60 * 1000, // 10 minutes in milliseconds
      });
      res.status(200).send("OTP is sending to your email");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },
  // CHANGE PASSWORD WITH OTP FROM EMAIL
  resetPassword: async (req, res) => {
    try {
      if (receivedOtp !== otpFromCookie) {
        return res.status(401).send("Incorrect OTP");
      }
      const storedEmail = req.cookies.email; // Retrieve the stored email from cookies

      if (!storedEmail) {
        return res.status(400).send("Email not found in cookies");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: storedEmail,
        },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }
      // Proceed with the password reset logic since OTP is verified

      // Your password reset logic here
      await prisma.user.update({
        where: {
          password: reqpassword,
        },
      });
      // Clear the OTP cookie after it's been used
      res.clearCookie("otp");
      res.clearCookie("email");
      res.status(200).send("Password reset successful");
    } catch (error) {
      console.log("Error:", error);
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

  // VERIFY OTP WHEN CHANGING PASSWORD
  verifyOTP: async (req, res) => {
    try {
      const receivedOtp = req.body.otp;
      if (!receivedOtp) {
        return res.status(400).send("OTP is required in the request body");
      }
      const otpFromCookie = req.cookies.otp;
      if (receivedOtp != otpFromCookie) {
        return res.status(404).send("OTP is invalid");
      }
    } catch (error) {
      res.status(404).json("Error", error);
    }
  },

  // VERIFY ACCOUNT WHEN REGISTER WITH EMAIL
  verify: async (req, res) => {
    try {
      const userID = parseInt(req.params.id);
      const tokenreq = req.params.token;

      console.log(
        "🚀 ~ file: AuthController.js:315 ~ verify: ~ tokenreq:",
        tokenreq
      );
      const user = await prisma.user.findUnique({
        where: { id: userID },
      });
      console.log(
        "🚀 ~ file: AuthController.js:320 ~ verify: ~ user:",
        user.id
      );

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
