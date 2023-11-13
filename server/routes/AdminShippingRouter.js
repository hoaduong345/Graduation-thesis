const AdminShippingController = require('../controller/AdminShippingController');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post("/register", AdminShippingController.registerShipping);





module.exports = router;
