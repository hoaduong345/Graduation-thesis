const AdminController = require('../controller/AdminController');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const checkAdminAuthentication = async (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const { email, password } = req.body;

  if (email === adminEmail && password === adminPassword) {
    // login = env
    next();
  } else {
    try {
      const admin = await prisma.admin.findFirst({
        where: { email },
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
router.put("/updateadmin/:id", AdminController.updateAdmin);
router.post("/changepassword/:id", AdminController.ChangePassword);


module.exports = router;
