
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image"); // Thư mục lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const ProductController = {


  //thêm danh mục
  addCategory: async (req, res) => {
    try {
      const { tendanhmuc } = req.body;
  
      // Tạo danh mục mới
      const newCategory = await prisma.category.create({
        data: {
          tendanhmuc,
        },
      });
  
      res.status(200).json("Thêm danh mục thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // xóa danh mục
  deleteCategory: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id); 
      const existingCategory = await prisma.category.findUnique({
        where: {
          iddanhmuc: categoryId,
        },
      });
      if (!existingCategory) {
        return res.status(404).json("Danh mục không tồn tại");
      } 
      // Xóa sản phẩm
      await prisma.category.delete({
        where: {
          iddanhmuc: categoryId,
        },
      });
      res.status(200).json("Xóa danh mục thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // cập nhật danh mục
  updateCategory: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id); 
      const tendanhmuc = req.body.tendanhmuc;

      console.log("🚀 ~ file: ProductController.js:70 ~ updateCategory: ~ categoryId:", categoryId)
      console.log("🚀 ~ file: ProductController.js:72 ~ updateCategory: ~ tendanhmuc:", tendanhmuc)
      // Kiểm tra xem danh mục tồn tại hay không
      const existingCategory = await prisma.category.findUnique({
        where: {
          iddanhmuc: categoryId,
        }
      });
      if (!existingCategory) {
        return res.status(404).json("Danh mục không tồn tại");
      } 
      // Cập nhật thông tin của danh mục
      const updatedCategory = await prisma.category.update({
        where: {
          iddanhmuc: categoryId,
        },
        data: {
          tendanhmuc
        }
      });
      console.log("🚀 ~ file: ProductController.js:90 ~ updateCategory: ~ tendanhmuc:", tendanhmuc) 

      res.status(200).json("Cập nhật danh mục thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // thêm sản phẩm
  addProduct: async (req, res) => {
    try {
      upload.single("hinhanh")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(500).json("Lỗi khi tải lên ảnh");
        } else if (err) {
          return res.status(500).json("Đã có lỗi xảy ra");
        }
  
        const {
          tensanpham,
          giasanpham,
          mota,
          soluong,
          trangthai,
          ngaytao,
          categoryId, // Thêm categoryId vào req.body
        } = req.body;
  
        // Kiểm tra validate
        if (tensanpham.length <= 6) {
          return res.status(400).json("Tên sản phẩm phải có ít nhất 6 kí tự");
        }
        if (parseInt(giasanpham) <= 0) {
          return res.status(400).json("Giá sản phẩm phải lớn hơn 0");
        }
        if (parseInt(soluong) <= 0) {
          return res.status(400).json("Số lượng sản phẩm phải lớn hơn 0");
        }
  
        const newProduct = {
          tensanpham,
          giasanpham: parseInt(giasanpham),
          mota,
          soluong: parseInt(soluong),
          trangthai,
          ngaytao: new Date(),
          hinhanh: req.file ? req.file.filename : null,
          categoryId: parseInt(categoryId), // Thêm categoryId vào newProduct
        };
  
        const neww = await prisma.product.create({
          data: newProduct,
        });
  
        res.status(200).json("Thêm sản phẩm thành công");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },


  // xóa sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const productId = parseInt(req.params.id); // Lấy id sản phẩm từ params
      // Kiểm tra xem sản phẩm có tồn tại không
      const existingProduct = await prisma.product.findUnique({
        where: {
          idsanpham: productId,
        },
      });
      if (!existingProduct) {
        return res.status(404).json("Sản phẩm không tồn tại");
      } 
      // Xóa sản phẩm
      await prisma.product.delete({
        where: {
          idsanpham: productId,
        },
      });
      res.status(200).json("Xóa sản phẩm thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },


  //cập nhật sản phẩm
  updateProduct: async (req, res) => {
    try {
      const ProductId = parseInt(req.params.id);
      const {
        tensanpham,
        giasanpham,
        mota,
        soluong,
        trangthai,
        ngaytao,
        categoryId,
      } = req.body;
  
      const existingProduct = await prisma.product.findUnique({
        where: {
          idsanpham: ProductId,
        },
      });
      if (!existingProduct) {
        return res.status(404).json("Sản phẩm không tồn tại");
      }
  
      let updatedImagePath = existingProduct.hinhanh; // Giữ nguyên đường dẫn hình ảnh cũ
  
      if (req.file) {
        updatedImagePath = req.file.filename;
      }
  
      const updatedProduct = await prisma.product.update({
        where: {
          idsanpham: ProductId
        },
        data: {     
          tensanpham : tensanpham,
          mota : mota,
          soluong : soluong,
          trangthai : trangthai,
          ngaytao: new Date(), 
          hinhanh: req.file, 
          categoryId : categoryId,
          giasanpham : giasanpham
        }
      });
    
      console.log(
        "🚀 ~ file: ProductController.js:219 ~ updateProduct: ~ updatedProduct:",
        updatedProduct
      );
  
      res.status(200).json("Cập nhật sản phẩm thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },


  // Xem chi tiết sản phẩm
  getProductDetail: async (req, res) => {
    try {
      const productId = parseInt(req.params.id);

      const productDetail = await prisma.product.findUnique({
        where: {
          idsanpham: productId,
        },
      });
  
      if (!productDetail) {
        return res.status(404).json("Không tìm thấy sản phẩm");
      } 
      res.status(200).json(productDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // Hiện tất cả sản phẩm
  getAllProduct: async(req, res) =>{
    try {
      const allProducts = await prisma.product.findMany();
      res.status(200).json(allProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // Phân trang 
  getProductsPaginated: async(req, res)=>{
    try {
      const page = parseInt(req.query.page) || 1; 
      const pageSize = parseInt(req.query.pageSize) || 10; 
      
      const skip = (page - 1) * pageSize;
      const products = await prisma.product.findMany({
        skip,
        take: pageSize,
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // tìm kiếm sp
  searchProducts: async(req, res)=>{
    try {
      const keyword = req.query.keyword || '';
  
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { tensanpham: { contains: keyword.toLowerCase() } }, // Sử dụng toLowerCase để tìm kiếm không phân biệt chữ hoa chữ thường
            { trangthai: { contains: keyword.toLowerCase() } },
          ],
        },
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },
  
 
};



module.exports = ProductController;
