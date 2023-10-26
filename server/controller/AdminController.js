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
    const { username, password } = req.body;
  
    try {
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newAdmin = await prisma.admin.create({
        data: {
          username,
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

  AdminProfile : async(req, res) => {
    try{
      const adminUsername = req.body.username;

      const updateAdmin = {
                email: req.body.email,
                username: req.body.username,
                name: req.body.name,
                phonenumber: req.body.phonenumber,
                sex: req.body.sex,
                dateofbirth: new Date(req.body.dateofbirth),
      };

      const updateAdminResponse = await prisma.admin.update({
            where:{
              username : adminUsername,
            },
            data : updateAdmin,
      });
      res.status(200).json(updateAdminResponse);
    }catch(error){
      console.log(error);
      res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật hồ sơ admin.", message: error.message });
    }
  },

  getAdmin: async (req, res) => {
    try {
      const adminUsername = req.params.username;
  
      // Tìm thông tin người dùng có ảnh
      const adminWithImage = await prisma.admin.findUnique({
        where: {
          username: adminUsername,
        },
        include: {
          AdminImage: true,
        },
      });
  //ss
      // Tìm thông tin người dùng không có ảnh
      const adminWithoutImage = await prisma.admin.findUnique({
        where: {
          username: adminUsername,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phonenumber: true,
          sex: true,
          dateofbirth: true, 
        },
      });
  
      if (!adminWithImage || !adminWithoutImage) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
  
      res.status(200).json({ adminWithImage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi truy xuất dữ liệu', message: error.message });
    }
  },
  

  addImageAdmin : async ( req, res) => {
    try{
          const { url, idadmin} = req.body

          const newImageAdmin = {
            url,
            idadmin : parseInt(idadmin),
          };

          const data = await prisma.adminImage.create({
              data : newImageAdmin,
          });
          res.status(200).json('Them hinh thanh cong');
    }catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
  },

  updateImageAdmin: async (req, res) => {
    try {
        const { idadmin } = req.params;
        const { url } = req.body;

        const updateImage = await prisma.adminImage.update({
            where: {
                idadmin: parseInt(idadmin),
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

  
};

module.exports = AdminController;
