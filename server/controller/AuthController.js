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
      process.env.SECRECT_KEY = "secrectkey",
      { expiresIn: "1h" }
    );
  },
  // GENERATE REFRESH TOKEN
  genereateRefreshToken: (email) => {
    return jwt.sign(
      {
        id: email.id,
      },
      process.env.JWT_REFRESH_TOKEN = "refreshkey",
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
        data: newUser,
      });
      // const token = await prisma.token.create({
      //   data: {
      //     userid: user.id,
      //     token: crypto.randomBytes(32).toString("hex"),
      //   },
      // });
      // const url = `${process.env.BASE_URL = "http://localhost:5173/"}/auth/${user.id}/verify/${token.token}`;
      // await SendEmail(user.email, "Verify email", url);
      console.log("user", user);
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
  login : async (req, res) => {
    try {
      const reqpassword = req.body.password;
      const reqemail = req.body.email;


      const user = await prisma.user.findUnique({
        where: { email: reqemail },
      });
      if (!user.email) {
        return res.status(404).json("wrong email");
      }

      const validPassword = await bcrypt.compare(
        reqpassword,
        user.password
      );


      if (!validPassword) {
        return res.status(404).json("wrong password");
      }
      
      if (user.verify == false) {
        const token = await prisma.token.findFirst({
          where: { userid: user.id },
        });
        
        if (!token) {
          token = await prisma.token.create({
            userid: user.id,
            token: crypto.randomBytes(32).toString("hex"),
          })

          const url = `${process.env.BASE_URL = "http://localhost:5173/"}user/${user.id}/verify/${token.token}`;

          await SendEmail(user.email, "Verify email", url);
        }
        return res.status(400).send({
          message: "An email has sent to your email, please check that",
        });
      }
      if (user.email && validPassword) {
        const accessToken = AuthController.genereateAccessToken(user.email);
        const refreshToken = AuthController.genereateRefreshToken(user.email);
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

  // 


   // CHANGE PASSWORD
    changePassword : async (req, res) => {
    const { id } = req.user;
    const { new_password, password } = req.body;
  
    const user = await prisma.user.findUnique({
      where: {
        id : id
      }
    });
    const compareOldPwd = await bcrypt.compareSync(password, user.password);
  
    if (!compareOldPwd) {
      return res.status(409).send({
        msg: "old password is incorrect!",
      });
    }
  
    const hashPassword = bcrypt.hashSync(new_password, SALT_ROUNDS);
  
    const update_user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
      },
    });
    if (!update_user) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "Reset password is failed!",
      });
    }
  
    logger.debug("resetPassword - END");
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      msg: "Reset password is successful!",
    });
  },
  // VERIFY ACCOUNT WHEN REGISTER WITH EMAIL
  verify: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          userId: user.id,
          token: req.params.token,
        },
      });
      if (!user) return res.status(400).send({ message: "invalid link" });
      const reqtoken = req.params.token;
      const token = await prisma.token.findUnique({
        where: {
          userid: user.id,
          token: reqtoken,
        },
      });
      await prisma.user.update({
        where: { id: user.id, verify: true },
      });
      await prisma.token.delete({
        where:{
          id: token.tokenid
        }
      });
      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
module.exports = AuthController;
