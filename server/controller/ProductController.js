
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
      const { name } = req.body;
  
      // Tạo danh mục mới
      const newCategory = await prisma.category.create({
        data: {
          name,
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
          idcategory: categoryId,
        },
      });
      if (!existingCategory) {
        return res.status(404).json("Danh mục không tồn tại");
      } 
      // Xóa sản phẩm
      await prisma.category.delete({
        where: {
          idcategory: categoryId,
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
      const name = req.body.name;

      // Kiểm tra xem danh mục tồn tại hay không
      const existingCategory = await prisma.category.findUnique({
        where: {
          idcategory: categoryId,
        }
      });
      if (!existingCategory) {
        return res.status(404).json("Danh mục không tồn tại");
      } 
      // Cập nhật thông tin của danh mục
      const updatedCategory = await prisma.category.update({
        where: {
          idcategory: categoryId,
        },
        data: {
          name,
        }
      });
      
      res.status(200).json("Cập nhật danh mục thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },



 
  
  



  // thêm sản phẩm
  addProduct: async (req, res) => {
    try {
      upload.single("images")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(500).json("Lỗi khi tải lên ảnh");
        } else if (err) {
          return res.status(500).json("Đã có lỗi xảy ra");
        }
  
        const {
          name,
          price,
          rate,
          pricesale,
          discount,
          soldcount,
          description,
          count,
          status,
          date,
          categoryId, // Thêm categoryId vào req.body
        } = req.body;
  
        // Kiểm tra validate
        if (name.length <= 6) {
          return res.status(400).json("Tên sản phẩm phải có ít nhất 6 kí tự");
        }
        if (parseInt(price) <= 0) {
          return res.status(400).json("Giá sản phẩm phải lớn hơn 0");
        }
        if (parseInt(count) <= 0) {
          return res.status(400).json("Số lượng sản phẩm phải lớn hơn 0");
        }
        if (parseInt(pricesale) <= 0) {
          return res.status(400).json("Sản phẩm Sale phải lớn hơn 0");
        }
        if (parseInt(discount) <= 0) {
          return res.status(400).json("Giảm giá sản phẩm phải lớn hơn 0");
        }
        
  
        const newProduct = {
          name,
          price: parseInt(price),
          rate: parseInt(rate),
          pricesale: parseInt(pricesale),
          discount: parseInt(discount),
          soldcount: parseInt(soldcount),         
          description,
          count: parseInt(count),
          status,
          date: new Date(),
          images: req.file ? req.file.filename : null,
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
          idproduct: productId,
        },
      });
      if (!existingProduct) {
        return res.status(404).json("Sản phẩm không tồn tại");
      } 
      // Xóa sản phẩm
      await prisma.product.delete({
        where: {
          idproduct: productId,
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
        name,
        price,
        rate,
        pricesale,
        discount,
        soldcount,
        description,
        count,
        status,
        categoryId, // Đổi thành categoryId
      } = req.body;
  
      const existingProduct = await prisma.product.findUnique({
        where: {
          idproduct: ProductId,
        },
      });
  
      if (!existingProduct) {
        return res.status(404).json({ error: "Sản phẩm không tồn tại" });
      }
  
      let updatedImagePath = existingProduct.images; // Đổi thành images
  
      if (req.file) {
        updatedImagePath = req.file.filename;
      }
  
      const updatedProduct = await prisma.product.update({
        where: {
          idproduct: ProductId
        },
        data: {
          name: name,
          price: price,
          rate: rate,
          pricesale: pricesale,
          discount: discount,
          soldcount: soldcount,
          description: description,
          count: count,
          status: status,
          date: new Date(),
          images: updatedImagePath, // Sử dụng updatedImagePath ở đây
          categoryId: categoryId,
        }
      });
  
      res.status(200).json("Cập nhật sản phẩm thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },


  // Xem chi tiết sản phẩm
  getProductDetail: async (req, res) => {
    try {
      const productId = parseInt(req.params.id);

      const productDetail = await prisma.product.findUnique({
        where: {
          idproduct: productId,
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
            { name: { contains: keyword.toLowerCase() } }, // Sử dụng toLowerCase để tìm kiếm không phân biệt chữ hoa chữ thường
            
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
