// const sendEmail = require("../utils/sendEmail");

const ProductController = require("../controller/ProductController");

const router = require("express").Router();

// thêm sản phẩm
router.post("/addproduct", ProductController.addProduct);

router.delete("/deleteproduct/:id", ProductController.deleteProduct);

router.put("/updateproduct/:id", ProductController.updateProduct);

router.get("/chitietproduct/:id", ProductController.getProductDetail);

router.get('/product/allproducts', ProductController.getAllProduct);

router.get('/product/paginated', ProductController.getProductsPaginated);

router.get('/product/search', ProductController.searchProducts);

// thêm danh mục

router.post("/addcategory", ProductController.addCategory);

router.delete("/deletecategory/:id", ProductController.deleteCategory);

router.put("/updatecategory/:id", ProductController.updateCategory);




module.exports = router;