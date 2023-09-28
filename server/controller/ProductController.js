const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image"); // Thư mục lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(
      new Error("Chỉ chấp nhận tệp ảnh có định dạng .jpg, .jpeg, hoặc .png"),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
});

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
          id: categoryId,
        },
      });
      if (!existingCategory) {
        return res.status(404).json("Danh mục không tồn tại");
      }
      await prisma.category.delete({
        where: {
          id: categoryId,
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
          id: categoryId,
        },
      });
      if (!existingCategory) {
        return res.status(404).json("Danh mục không tồn tại");
      }
      // Cập nhật thông tin của danh mục
      const updatedCategory = await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name,
        },
      });

      res.status(200).json("Cập nhật danh mục thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // get all data category
  getAllCategory: async (req, res) => {
    try {
      const AllCategory = await prisma.category.findMany();
      res.status(200).json(AllCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // thêm sản phẩm

  addImagesByProductsID: async (req, res) => {
    try {
      const { url, idproduct } = req.body;
      console.log(req.body);
      const newImages = {
        url,
        idproduct: parseInt(idproduct),
      };

      const data = await prisma.productImage.create({
        data: newImages,
      });
      res.status(200).json("Thêm hinh thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  updateImageByProductID: async (req, res) => {
    try {
      const { id } = req.params;
      const { url, idproduct } = req.body;

      const existingImage = await prisma.productImage.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!existingImage) {
        return res.status(404).json("Hình ảnh không tồn tại");
      }

      const updatedImage = await prisma.productImage.update({
        where: {
          id: parseInt(id),
        },
        data: {
          url,
          idproduct: parseInt(idproduct),
        },
      });

      res.status(200).json("Cập nhật hình ảnh thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  deleteImageByProductID: async (req, res) => {
    const productID = parseInt(req.params.id);
    try {
      const imagesToDelete = await prisma.productImage.findMany({
        where: {
          id: productID,
        },
      });

      if (!imagesToDelete || imagesToDelete.length === 0) {
        return res.status(404).json("Không có hình ảnh nào để xóa");
      }

      for (const image of imagesToDelete) {
        await prisma.productImage.delete({
          where: {
            id: image.id,
          },
        });
      }
      res.status(200).json("Xóa hình ảnh thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  addProduct: async (req, res) => {
    try {
      const {
        name,
        price,
        rate,
        pricesale,
        sellingPrice,
        discount,
        soldcount,
        quantity,
        description,
        status,
        date,
        productId,
        createdAt,
        updatedAt,
        categoryID,
      } = req.body;

      if (name.length <= 6) {
        return res.status(400).json("Tên sản phẩm phải có ít nhất 6 kí tự");
      }
      if (parseInt(price) <= 0) {
        return res.status(400).json("Giá sản phẩm phải lớn hơn 0");
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
        sellingPrice: parseInt(sellingPrice),
        discount: parseInt(discount),
        soldcount: parseInt(soldcount),
        quantity: parseInt(quantity),
        description,
        status,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: parseInt(productId),
        categoryID: parseInt(categoryID),
      };

      const neww = await prisma.product.create({
        data: newProduct,
      });

      console.log(neww);
      // res.status(200).json("Thêm sản phẩm thành công");
      res.status(200).json(neww);
      // });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // xóa sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const productId = parseInt(req.params.id);

      // Xóa sản phẩm
      await prisma.product.delete({
        where: {
          id: productId,
        },
      });

      await prisma.productImage.deleteMany({
        where: {
          idproduct: productId,
        },
      });

      res.status(200).json("Xóa sản phẩm và hình ảnh thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  //cập nhật sản phẩm
  updateProduct: async (req, res) => {
    try {
      const productid = parseInt(req.params.id);

      const {
        name,
        price,
        rate,
        pricesale,
        sellingPrice,
        discount,
        soldcount,
        quantity,
        description,
        status,
        date,
        productId,
        createdAt,
        updatedAt,
        categoryID,
      } = req.body;

      // Kiểm tra validate
      if (name.length <= 6) {
        return res.status(400).json("Tên sản phẩm phải có ít nhất 6 kí tự");
      }
      if (parseInt(price) <= 0) {
        return res.status(400).json("Giá sản phẩm phải lớn hơn 0");
      }
      if (parseInt(pricesale) <= 0) {
        return res.status(400).json("Sản phẩm Sale phải lớn hơn 0");
      }
      if (parseInt(discount) <= 0) {
        return res.status(400).json("Giảm giá sản phẩm phải lớn hơn 0");
      }

      // Tạo dữ liệu mới để cập nhật
      const updatedProductData = {
        name,
        price: parseInt(price),
        rate: parseInt(rate),
        pricesale: parseInt(pricesale),
        sellingPrice: parseInt(sellingPrice),
        discount: parseInt(discount),
        soldcount: parseInt(soldcount),
        quantity: parseInt(quantity),
        description,
        status,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: parseInt(productId),
        categoryID: parseInt(categoryID),
      };

      const updatedProduct = await prisma.product.update({
        where: {
          id: productid,
        },
        data: {
          ...updatedProductData,
          categoryID: parseInt(categoryID),
        },
      });
      console.log(
        "?? ~ file: ProductController.js:258 ~ upload.single ~ updatedProduct:",
        updatedProduct
      );

      // res.status(200).json("Cập nhật sản phẩm thành công");
      console.log(updatedProduct);
      res.status(200).json(updatedProduct);
      // });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // Xem chi tiết sản phẩm
  getProductDetail: async (req, res) => {
    try {
      const productId = parseInt(req.params.id);

      // const productDetail = await prisma.product.findUnique({
      //    where: {
      //       id: productId,
      //    },
      // });
      const productDetail = await prisma.product.findFirst({
        include: {
          ProductImage: true,
        },
        where: {
          id: productId,
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
  getAllProduct: async (req, res) => {
    try {
      const keyword = req.query.keyword;
      console.log(
        "🚀 ~ file: ProductController.js:407 ~ getAllProduct: ~ name:",
        keyword
      );
      // const allProducts = await prisma.product.findMany();
      const result = await prisma.product.findMany({
        include: {
          ProductImage: true,
          fK_category: true,
        },
        where: {
          name: {
            contains: keyword,
          },
        },
      });
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  },

  // Phân trang
  getProductsPaginated: async (req, res) => {
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
//   searchProducts: async (req, res) => {
//     try {
//       const keyword = req.query.keyword || "";

//       const products = await prisma.product.findMany({
//         where: {
//           OR: [
//             { name: { contains: keyword.toLowerCase() } }, // Sử dụng toLowerCase để tìm kiếm không phân biệt chữ hoa chữ thường
//           ],
//         },
//       });

//       res.status(200).json(products);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json(error.message);
//     }
//   },
};

module.exports = ProductController;
