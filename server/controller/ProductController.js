const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'image'); // Thư mục lưu trữ ảnh
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận tệp ảnh có định dạng .jpg, .jpeg, hoặc .png'), false);
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
            const { image } = req.body;

            // Tạo danh mục mới
            const newCategory = await prisma.category.create({
                data: {
                    name,
                    image,
                },
            });

            res.status(200).json('Thêm danh mục thành công');
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
                return res.status(404).json('Danh mục không tồn tại');
            }
            await prisma.category.delete({
                where: {
                    id: categoryId,
                },
            });
            res.status(200).json('Xóa danh mục thành công');
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
            const image = req.body.image;

            // Kiểm tra xem danh mục tồn tại hay không
            const existingCategory = await prisma.category.findUnique({
                where: {
                    id: categoryId,
                },
            });
            if (!existingCategory) {
                return res.status(404).json('Danh mục không tồn tại');
            }
            // Cập nhật thông tin của danh mục
            const updatedCategory = await prisma.category.update({
                where: {
                    id: categoryId,
                },
                data: {
                    name,
                    image,
                },
            });

            res.status(200).json('Cập nhật danh mục thành công');
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
            res.status(200).json('Thêm hinh thành công');
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
                return res.status(404).json('Hình ảnh không tồn tại');
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

            res.status(200).json('Cập nhật hình ảnh thành công');
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
                return res.status(404).json('Không có hình ảnh nào để xóa');
            }

            for (const image of imagesToDelete) {
                await prisma.productImage.delete({
                    where: {
                        id: image.id,
                    },
                });
            }
            res.status(200).json('Xóa hình ảnh thành công');
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
                createdAt,
                updatedAt,
                categoryID,
            } = req.body;

            const SellingPrice = price - price * (discount / 100);
            const Pricesale = price * (discount / 100);

            const newProduct = {
                name,
                price: parseInt(price),
                rate: parseInt(rate),
                pricesale: Pricesale,
                sellingPrice: SellingPrice,
                discount: parseInt(discount),
                soldcount: parseInt(soldcount),
                quantity: parseInt(quantity),
                description,
                status,
                date: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                // productId: parseInt(productId),
                categoryID: parseInt(categoryID),
            };

            const neww = await prisma.product.create({
                data: newProduct,
            });

            console.log('a', SellingPrice);
            console.log('b', Pricesale);

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

            res.status(200).json('Xóa sản phẩm và hình ảnh thành công');
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
                createdAt,
                updatedAt,
                categoryID,
            } = req.body;

            const SellingPrice = price - price * (discount / 100);
            const Pricesale = price * (discount / 100);

            // Tạo dữ liệu mới để cập nhật
            const updatedProductData = {
                name,
                price: parseInt(price),
                rate: parseInt(rate),
                pricesale: Pricesale,
                sellingPrice: SellingPrice,
                discount: parseInt(discount),
                soldcount: parseInt(soldcount),
                quantity: parseInt(quantity),
                description,
                status,
                date: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
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
            console.log('?? ~ file: ProductController.js:258 ~ upload.single ~ updatedProduct:', updatedProduct);

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
            const productDetail = await prisma.product.findFirst({
                include: {
                    ProductImage: true,
                },
                where: {
                    id: productId,
                },
            });
            if (!productDetail) {
                return res.status(404).json('Không tìm thấy sản phẩm');
            }

            const ratings = await prisma.rating.findMany({
                where: {
                    idproduct: productId,
                },
                include: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                    product: {
                        select: {
                            quantity: true,
                        },
                    },
                },
            });
            if (ratings.length === 0) {
                return res.status(200).json(0);
            }
            const totalRating = ratings.reduce((sum, rating) => sum + rating.ratingValue, 0);
            const averageRating = totalRating / ratings.length;
            const resultProduct = {
                averageRating: averageRating,
                Rating: ratings,
                productDetail: productDetail,
            };
            res.status(200).json(resultProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    // Hiện tất cả sản phẩm
    getAllProduct: async (req, res) => {
        try {
            // tìm kiếm = keyword
            const keyword = req.query.keyword;
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 40;
            const sortByPrice = req.query.sortByPrice;
            const sortByDateCreate = req.query.sortByDateCreate;
            const categoryId = req.query.categoryId;
            const discount = 60;
            const productId = parseInt(req.params.id);

            const FlashsaleProducts = await prisma.product.findMany({
                where: {
                    discount: {
                        gt: discount,
                    },
                },
                take: 3,
            });

            // const { minPricefind, maxPricefind } = req.query;

            const skip = (page - 1) * pageSize;
            const whereClause = {
                name: {
                    contains: keyword,
                },
            };
            const totalProduct = await prisma.product.findMany({
                where: whereClause,
            });

            if (categoryId) {
                whereClause.fK_category = {
                    id: parseInt(categoryId),
                };
            }

            if (req.query.minPrice && req.query.maxPrice) {
                whereClause.sellingPrice = {
                    gte: parseInt(req.query.minPrice),
                    lte: parseInt(req.query.maxPrice),
                };
            }
            if (req.query.minQuantity && req.query.maxQuantity) {
                whereClause.quantity = {
                    gte: parseInt(req.query.minQuantity),
                    lte: parseInt(req.query.maxQuantity),
                };
            }
            const ratings = await prisma.rating.findMany({
                // where: {
                //     idproduct: productId,
                // },
                include: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                    product: {
                        select: {
                            quantity: true,
                        },
                    },
                },
            });
            if (ratings.length === 0) {
                return res.status(200).json(0);
            }
            // const totalRating = ratings.reduce((sum, rating) => sum + rating.ratingValue, 0);
            // const averageRating = totalRating / ratings.length;
            const result = await prisma.product.findMany({
                orderBy: {
                    sellingPrice: sortByPrice,
                    createdAt: sortByDateCreate,
                },
                include: {
                    ProductImage: true,
                    fK_category: true,
                    Rating: true,
                },
                where: whereClause,
                skip,
                take: pageSize,
            });

            result.map((item) => {
                const totalRating = item.Rating.reduce((sum, rating) => sum + rating.ratingValue, 0);
                const averageRating = totalRating / item.Rating.length;
                item.rate = averageRating;
            });

            const resultProduct = {
                FlashsaleProducts: FlashsaleProducts,
                currentPage: page,
                totalPage: Math.ceil(totalProduct.length / pageSize),
                rows: result,
                // averageRating: averageRating,
                Rating: ratings,
            };
            res.status(200).json(resultProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    getSugggestProduct: async (req, res) => {
        try {
            const productId = parseInt(req.params.id);

            const newProduct = await prisma.product.findUnique({
                where: {
                    id: productId,
                },
            });
            if (!newProduct) {
                return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
            }
            const categoryId = newProduct.categoryID;

            const recommendedProducts = await prisma.product.findMany({
                include: {
                    ProductImage: true,
                },
                where: {
                    id: {
                        not: productId,
                    },
                    categoryID: categoryId,
                },
                take: 10,
            });
            res.json(recommendedProducts);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    getNewProducts: async (req, res) => {
        try {
            const newProducts = await prisma.product.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                take: 5,
            });
            res.json(newProducts);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    addProductRating: async (req, res) => {
        try {
            const userId = parseInt(req.cookies.id);
            console.log('🚀 ~ file: ProductController.js:507 ~ addProductRating: ~ userId:', userId);
            const { productId, ratingValue, comment } = req.body;
            const rating = await prisma.rating.create({
                data: {
                    idproduct: productId,
                    iduser: userId,
                    ratingValue,
                    comment,
                },
            });

            res.status(200).json(rating);
        } catch (error) {
            console.error(error);
            res.status(200).json('Đánh giá sản phẩm không thành công');
        }
    },

    getAllRatingandComment: async (req, res) => {
        try {
            const productId = parseInt(req.params.productId);
            const page = parseInt(req.query.page) || 1; 
            const perPage = parseInt(req.query.perPage) || 10; 
    
            const ratings = await prisma.rating.findMany({
                where: {
                    idproduct: productId,
                },
                include: {
                    user: {
                        select: {
                            username: true,                    
                        },
                    },
                    product: {
                        select: {
                            quantity: true,
                        },
                    },
                },
                skip: (page - 1) * perPage,
                take: perPage,
            });
    
            if (ratings.length === 0) {
                return res.status(200).json(0);
            }
    
            const totalRating = ratings.reduce((sum, rating) => sum + rating.ratingValue, 0);
            const averageRating = totalRating / ratings.length;
            
            const resultProduct = {          
                currentPage: page,
                perPage: perPage,
                total: ratings.length, 
                averageRating: averageRating,
                Rating: ratings,
            };
    
            res.status(200).json(resultProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
    

    updateRatingandComment: async (req, res) => {
        try {
            const ratingId = parseInt(req.params.ratingId);
            const { ratingValue, comment } = req.body;

            const existingRating = await prisma.rating.findUnique({
                where: {
                    id: ratingId,
                },
            });

            if (!existingRating) {
                return res.status(404).json('Đánh giá không tồn tại');
            }

            const updatedRating = await prisma.rating.update({
                where: {
                    id: ratingId,
                },
                data: {
                    ratingValue,
                    comment,
                },
            });

            res.status(200).json(updatedRating);
        } catch (error) {
            console.error(error);
            res.status(500).json('Cập nhật đánh giá sản phẩm không thành công');
        }
    },

    deleteRatingandComment: async (req, res) => {
        try {
            const ratingId = parseInt(req.params.ratingId);

            const existingRating = await prisma.rating.findUnique({
                where: {
                    id: ratingId,
                },
            });

            if (!existingRating) {
                return res.status(404).json('Đánh giá không tồn tại');
            }

            await prisma.rating.delete({
                where: {
                    id: ratingId,
                },
            });

            res.status(200).json('Xóa đánh giá sản phẩm thành công');
        } catch (error) {
            console.error(error);
            res.status(500).json('Xóa đánh giá sản phẩm không thành công');
        }
    },




    addImageComment : async(req, res) =>{
      try{
        const { url, idcomment } = req.body

        const newImageComment = {
          url,
          idcomment : parseInt(idcomment),
        };

        const data = await prisma.commentImage.create({
            data : newImageComment,
        }); 
        res.status(200).json(data);
      }catch(error){
        console.error(error);
        res.status(500).json(error.message);
      }
    },

    updateImageComment : async (req, res) => {
      try{
          const { id } = req.params;
          const {url , idcomment} = req.body;

          const updateImageComment = await prisma.commentImage.update({
            where : {
              id : parseInt(id),
            },
            data : {
                url,
                idcomment : parseInt(idcomment)
            },
          });

          res.status(200).json(data);
      }catch(error){
        res.status(500).json(error.message);
        // dit cu m
      }
    },


};

module.exports = ProductController;
