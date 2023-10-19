const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const SendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const decode = require('jwt-decode');
const { re } = require('mathjs');
dotenv.config();

const UserController = {
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
                return res.status(404).json('User không tồn tại');
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

            res.status(200).json('Xóa User thành công');
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
                dateOfBirth: new Date(req.body.dateOfBirth),
            };

            const updatedUserResponse = await prisma.user.update({
                where: {
                    username: userId,
                },
                data: updatedUser,
            });

            res.status(200).json('Lưu hồ sơ thành công');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    getUser: async (req, res) => {
        try {
            const UserId = req.params.username;

            const userWithImage = await prisma.user.findUnique({
                include: {
                    UserImage: true,
                },
                where: {
                    username: UserId,
                },
            });

            // Tìm thông tin người dùng không có ảnh
            const userWithoutImage = await prisma.user.findUnique({
                where: {
                    username: UserId,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phonenumber: true,
                    sex: true,
                    dateOfBirth: true,
                },
            });

            if (!userWithImage || !userWithoutImage) {
                return res.status(404).json({ error: 'Không tìm thấy người dùng' });
            }

            // Kết hợp thông tin từ cả hai kết quả
            const user = {
                ...userWithoutImage,
                UserImage: userWithImage.UserImage,
            };

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    PaymentAddress: async (req, res) => {
        try {
            const Name = req.body.username;

            const updatedPaymentAddress = {
                username: req.body.username,
                addresstype: req.body.addresstype,
                address: req.body.address,
                specificaddress: req.body.specificaddress,
            };

            const update = await prisma.user.update({
                where: {
                    username: Name,
                },
                data: updatedPaymentAddress,
            });

            res.status(200).json(update);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    getPaymentAddress: async (req, res) => {
        try {
            const Name = req.params.username;

            const userWithoutImage = await prisma.user.findUnique({
                where: {
                    username: Name,
                },
                select: {
                    id: true,
                    username: true,
                    address: true,
                    addresstype: true,
                    specificaddress: true,
                },
            });

            res.status(200).json(userWithoutImage);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    getAccountStatus: async (req, res) => {
        try {
            const Name = req.params.username;

            const AccountStatus = await prisma.user.findUnique({
                where: {
                    username: Name,
                },
                select: {
                    id: true,
                    createdAt: true,
                },
            });
            res.status(200).json(AccountStatus);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    AccountStatus: async (req, res) => {
        try {
            const Name = req.body.username;

            const updatedAccountStatus = {
                id: req.body.id,
                createdAt: req.body.createdAt,
            };

            const update = await prisma.user.update({
                where: {
                    username: Name,
                },
                data: updatedAccountStatus,
            });

            res.status(200).json(update);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    addImageUser: async (req, res) => {
        try {
            const { url, iduser } = req.body;

            const newImagesUser = {
                url,
                iduser: parseInt(iduser),
            };

            const data = await prisma.userImage.create({
                data: newImagesUser,
            });
            res.status(200).json('Thêm hinh thành công');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    updateImageUser: async (req, res) => {
        try {
            const { iduser } = req.params;
            const { url } = req.body;

            const updateImage = await prisma.userImage.update({
                where: {
                    iduser: parseInt(iduser),
                },
                data: {
                    url,
                },
            });

            res.status(200).json('Cập nhật hình ảnh thành công');
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getAllUser: async (req, res) => {
        try {
            const AllUser = await prisma.user.findMany();
            res.status(200).json(AllUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};
module.exports = UserController;
