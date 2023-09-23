const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const decode = require("jwt-decode");
const { re } = require("mathjs");
dotenv.config();

const UserController = {
  // GENERATE ACCESS TOKEN


  deleteregister: async (req, res) => {
    try {
      const registerId = parseInt(req.params.id);
      const existingUser = await prisma.user.findUnique({
        where: {
          id: registerId,
        },
        include: {
          Token: true,
        },
      });

      if (!existingUser) {
        return res.status(404).json("User không tồn tại");
      }

      if (existingUser.Token.length > 0) {
        await prisma.token.deleteMany({
          where: {
            userid: registerId,
          },
        });
      }
      await prisma.user.delete({
        where: {
          id: registerId,
        },
      });

      res.status(200).json("Xóa User thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  UserProfile: async (req, res) => {
    try {
      const userId = req.body.username;

      const updatedUser = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        sex: req.body.sex,
        dateOfBirth: new Date(req.body.dateOfBirth)
      };

      const updatedUserResponse = await prisma.user.update({
        where: {
          username: userId,
        },
        data: updatedUser,
      });

      res.status(200).json("Lưu hồ sơ thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  UpdatePassword: async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const newPasswordConfirmation = req.body.newPasswordConfirmation;

      if (newPassword !== newPasswordConfirmation) {
        return res.status(400).json("Mật khẩu mới và xác nhận mật khẩu không khớp");
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // Xác thực mật khẩu cũ
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        return res.status(401).json("Mật khẩu cũ không chính xác");
      }

      // Mật khẩu cũ hợp lệ, tiến hành cập nhật mật khẩu mới
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const updatePassword = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedNewPassword, // Lưu mật khẩu mới đã mã hóa
        },
      });

      res.status(200).json("Cập nhật mật khẩu thành công");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },


};
module.exports = UserController;