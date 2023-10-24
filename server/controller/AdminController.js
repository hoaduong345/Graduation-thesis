const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const AdminController = {
  // get all
  getAllAdmins: async (req, res) => {
    try {
      const admins = await prisma.admin.findMany();
      res.json(admins);
    } catch (error) {
      res.status(500).json("loi");
    }
  },

  // add
  createAdmin: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newAdmin = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
  
      res.json(newAdmin);
    } catch (error) {
      res.status(500).json("Lỗi");
    }
  },

  // Xóa
  deleteAdmin: async (req, res) => {
    const adminId = parseInt(req.params.id);
    try {
      await prisma.admin.delete({
        where: { id: adminId },
      });
      res.json("xoa tc");
    } catch (error) {
      res.status(500).json("loi");
    }
  },

  //  sửa
  updateAdmin: async (req, res) => {
    const adminId = parseInt(req.params.id);
    const { email, password } = req.body;
    try {
      const admin = await prisma.admin.findUnique({
        where: { id: adminId },
      });
      if (!admin) {
        res.status(404).json("Không tìm thấy tài khoản admin");
        return;
      }
      let hashedPassword = password;
      if (admin.password) {
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (passwordMatch) {
          hashedPassword = admin.password;
        } else {
          const saltRounds = 10; 
          hashedPassword = await bcrypt.hash(password, saltRounds);
        }
      }
      // Cập nhật thông tin tài khoản admin
      const updatedAdmin = await prisma.admin.update({
        where: { id: adminId },
        data: {
          email,
          password: hashedPassword,
        },
      });
  
      res.json(updatedAdmin);
    } catch (error) {
      res.status(500).json("Có lỗi xảy ra khi cập nhật tài khoản admin");
    }
  },

  ChangePassword: async (req, res) => {
    const adminId = parseInt(req.params.id);
    const { oldPassword, newPassword, confirmPassword } = req.body;
  
    try {
      const admin = await prisma.admin.findUnique({
        where: { id: adminId },
      });
  
      if (!admin) {
        res.status(404).json("Không tìm thấy tài khoản admin");
        return;
      }
  
      const oldHashedPassword = admin.password;
      // So sánh mật khẩu cũ đã nhập từ người dùng với mật khẩu cũ đã mã hóa
      const oldPasswordMatch = await bcrypt.compare(oldPassword, oldHashedPassword);
  
      if (!oldPasswordMatch) {
        res.status(401).json("Mật khẩu cũ không chính xác");
        return;
      }
  
      if (newPassword !== confirmPassword) {
        res.status(400).json("Mật khẩu mới và xác nhận mật khẩu không khớp");
        return;
      }
  
      // Mã hóa mật khẩu mới
      const saltRounds = 10; 
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
  
      const updatedAdmin = await prisma.admin.update({
        where: { id: adminId },
        data: {
          password: hashedNewPassword,
        },
      });
  
      res.json(updatedAdmin);
    } catch (error) {
      res.status(500).json("Có lỗi xảy ra khi thay đổi mật khẩu");
    }
  },
  
};

module.exports = AdminController;
