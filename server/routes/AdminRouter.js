const AdminController = require('../controller/AdminController');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const checkAdminAuthentication = async (req, res, next) => {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const { username, password } = req.body;

  if (username === adminUsername && password === adminPassword) {
    // login = env
    next();
  } else {
    try {
      const admin = await prisma.admin.findFirst({
        where: { username },
      });

      if (admin) {
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (passwordMatch) {
          // login  = data
          next();
        } else {
          res.status(401).send("Không thể đăng nhập");
        }
      } else {
        res.status(401).send("Không thể đăng nhập");
      }
    } catch (error) {
      console.error("Lỗi: " + error);
      res.status(500).json({ error: 'Lỗi khi xác thực' });
    }
  }
};



router.post("/login", checkAdminAuthentication, (req, res) => {
  // res.send(adminEmail);
      // res.redirect("/admin/ListproductsAdmin"); 
  res.send("login admin tc");
});



router.get("/getalladmin", AdminController.getAllAdmins);
router.post("/addadmin", AdminController.createAdmin);
router.delete("/deleteadmin/:id", AdminController.deleteAdmin);
router.post("/changepassword/:id", AdminController.ChangePassword);

router.put("/adminprofile/:username", AdminController.AdminProfile);

router.get("/chitietadmin/:username", AdminController.getAdmin);

router.post("/addimageadmin", AdminController.addImageAdmin);
//ss

module.exports = router;
